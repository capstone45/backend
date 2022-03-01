import express from 'express';
import { EntityManager } from 'typeorm';

import { AbstractTagController, AbstractTagRepository, AbstractTagService } from './tag';
import TagController from './tag.controller';
import TagService from './tag.service';
import TagRepository from './tag.repository';

function tagController(tagService: TagService, app: express.Application): AbstractTagController {
	return TagController.getInstance(tagService, app);
}

function tagService(tagRepository: AbstractTagRepository): AbstractTagService {
	return TagService.getInstance(tagRepository);
}

function tagRepository(manager: EntityManager): AbstractTagRepository {
	return TagRepository.getInstance(manager);
}

function initController(app: express.Application, manager: EntityManager) {
	tagController(tagService(tagRepository(manager)), app);
}

export default initController;
