import express from 'express';
import { Connection } from 'typeorm';

import { AbstractTagController, AbstractTagRepository, AbstractTagService } from './tag';
import TagController from './tag.controller';
import TagService from './tag.service';
import TagRepository from './tag.repository';

import TagEntity from './tag.entity';

function tagController(tagService: TagService, app: express.Application): AbstractTagController {
	return TagController.getInstance(tagService, app);
}

function tagService(tagRepository: AbstractTagRepository): AbstractTagService {
	return TagService.getInstance(tagRepository);
}

function tagRepository(connection: Connection, TagEntity: any): AbstractTagRepository {
	return TagRepository.getInstance(connection, TagEntity);
}

function initController(app: express.Application, connection: Connection) {
	tagController(tagService(tagRepository(connection, TagEntity)), app);
}

export default initController;
