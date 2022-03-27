import User from './entity';

import { AbsUserRepository } from './type/repository';
import { AbsUserService } from './type/service';

import { BaseRecipeDTO } from '../recipe/type/dto';
import { UpdateUserDTO, ReadUserDetailDTO, ReadUserDTO, CreateUserDTO, BaseUserDTO,LogInUserDTO } from './type/dto';
import UserError from './type/error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export default class UserService implements AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(dependency);
		}
		return UserService.instance;
	}

	private constructor(dependency) {
		UserService.userRepository = dependency.userRepository;
	}

	async bcryptPassword(loginPassword: string): Promise<string> {
		const hash = await bcrypt.hash(loginPassword, SALT_ROUNDS);
		return hash;
	}

	async comparePassword(logInPassword:string, hashedUserPassword:string): Promise<boolean> {
		const isMatch = await bcrypt.compare(logInPassword, hashedUserPassword);
		return isMatch;
	}
	
	async signIn(createUserInformation: CreateUserDTO): Promise<BaseUserDTO | Error> {
		if (createUserInformation.loginPassword !== createUserInformation.confirmPassword)
			throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const findUser = await UserService.userRepository.findByLoginId(createUserInformation.loginId);
		if (findUser) throw new Error(UserError.USER_ID_EXISTS.message);

		const encodedPassword  = await this.bcryptPassword(createUserInformation.loginPassword);

		createUserInformation.loginPassword = encodedPassword;

		const newUser = User.create(createUserInformation);
		await UserService.userRepository.save(newUser);

		const userDto = new BaseUserDTO(newUser.id, newUser.nickname, newUser.thumbnailUrl);

		return userDto;
	}

	async signOut(userId: number): Promise<void | Error> {
		const user = await UserService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		await UserService.userRepository.remove(user);
	}

	async logIn(logInUserInformation: LogInUserDTO): Promise<string | Error> {
		const user = await UserService.userRepository.findByLoginId(logInUserInformation.loginId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		const isMatch = await this.comparePassword(logInUserInformation.loginPassword, user.loginPassword);

		if(!isMatch) throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const token = jwt.sign({loginId: user.loginId}, "secretToken");
		const userToken = token;		

		return userToken;
	}

	// async auth

	// async logOut

	async updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void | Error> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.updateThumbnail(userId, thumbnailUrl);
	}

	async deleteThumbnail(targetUserId: number, userId: number): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.deleteThumbnail(userId);
	}

	async updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error> {
		const { loginPassword, confirmPassword } = updateUserInfomation;
		if (loginPassword !== confirmPassword) throw new Error(UserError.PASSWORD_NOT_MATCH.message);
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		const user = await UserService.userRepository.findById(targetUserId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);
		
		// 비밀번호를 변경하지 않았을 때에도 암호화 할 것인지 고민
		const encodedPassword  = await this.bcryptPassword(updateUserInfomation.loginPassword);

		user.loginPassword = encodedPassword;
		user.nickname = updateUserInfomation.nickname;
		user.description = updateUserInfomation.description;

		await UserService.userRepository.save(user);
	}

	async findById(id: number): Promise<ReadUserDetailDTO | Error> {
		const user = await UserService.userRepository.findById(id);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		const rawMyRecipe = await user.recipes;
		const baseMyRecipe = rawMyRecipe.map((rawRecipe) => {
			return new BaseRecipeDTO(rawRecipe.id, rawRecipe.title, rawRecipe.thumbnailUrl);
		});

		const rawLikeRecipe = await user.bookmarks;
		const baseLikeRecipe = rawLikeRecipe.map((rawRecipe) => {
			return new BaseRecipeDTO(rawRecipe.id, rawRecipe.title, rawRecipe.thumbnailUrl);
		});

		const rawSubscribingUser = await user.stars;
		const baseSbuscribingUser = rawSubscribingUser.map((rawUser) => {
			return new BaseUserDTO(rawUser.id, rawUser.nickname, rawUser.thumbnailUrl);
		});

		return new ReadUserDetailDTO(user, baseMyRecipe, baseLikeRecipe, baseSbuscribingUser);
	}

	async findByNickname(nickname: string): Promise<ReadUserDTO[] | Error> {
		const users = await UserService.userRepository.findByNickname(nickname);

		return users.length === 0 ? [] : await Promise.all(users.map(async (user) => new ReadUserDTO(user)));
	}
}
