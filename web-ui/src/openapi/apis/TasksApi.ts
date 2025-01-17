// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/**
 * API Documentation
 * API endpoints and details
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from '../models/index';
import {
    CreateTaskDtoFromJSON,
    CreateTaskDtoToJSON,
    TaskFromJSON,
    TaskToJSON,
    UpdateTaskDtoFromJSON,
    UpdateTaskDtoToJSON,
} from '../models/index';

export interface TaskControllerCreateRequest {
    taskListId: number;
    createTaskDto: CreateTaskDto;
}

export interface TaskControllerDeleteRequest {
    id: number;
    taskListId: number;
}

export interface TaskControllerGetAllRequest {
    taskListId: number;
    field: TaskControllerGetAllFieldEnum;
    order: TaskControllerGetAllOrderEnum;
    status?: TaskControllerGetAllStatusEnum;
    limit?: number;
    page?: number;
}

export interface TaskControllerGetByIdRequest {
    id: number;
    taskListId: number;
}

export interface TaskControllerUpdateRequest {
    id: number;
    taskListId: number;
    updateTaskDto: UpdateTaskDto;
}

/**
 * 
 */
export class TasksApi extends runtime.BaseAPI {

    /**
     * Create a new task
     */
    async taskControllerCreateRaw(requestParameters: TaskControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['taskListId'] == null) {
            throw new runtime.RequiredError(
                'taskListId',
                'Required parameter "taskListId" was null or undefined when calling taskControllerCreate().'
            );
        }

        if (requestParameters['createTaskDto'] == null) {
            throw new runtime.RequiredError(
                'createTaskDto',
                'Required parameter "createTaskDto" was null or undefined when calling taskControllerCreate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/projects/{taskListId}/tasks`.replace(`{${"taskListId"}}`, encodeURIComponent(String(requestParameters['taskListId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTaskDtoToJSON(requestParameters['createTaskDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     * Create a new task
     */
    async taskControllerCreate(requestParameters: TaskControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.taskControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a task
     */
    async taskControllerDeleteRaw(requestParameters: TaskControllerDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taskControllerDelete().'
            );
        }

        if (requestParameters['taskListId'] == null) {
            throw new runtime.RequiredError(
                'taskListId',
                'Required parameter "taskListId" was null or undefined when calling taskControllerDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/projects/{taskListId}/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))).replace(`{${"taskListId"}}`, encodeURIComponent(String(requestParameters['taskListId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     * Delete a task
     */
    async taskControllerDelete(requestParameters: TaskControllerDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.taskControllerDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all tasks
     */
    async taskControllerGetAllRaw(requestParameters: TaskControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['taskListId'] == null) {
            throw new runtime.RequiredError(
                'taskListId',
                'Required parameter "taskListId" was null or undefined when calling taskControllerGetAll().'
            );
        }

        if (requestParameters['field'] == null) {
            throw new runtime.RequiredError(
                'field',
                'Required parameter "field" was null or undefined when calling taskControllerGetAll().'
            );
        }

        if (requestParameters['order'] == null) {
            throw new runtime.RequiredError(
                'order',
                'Required parameter "order" was null or undefined when calling taskControllerGetAll().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['status'] != null) {
            queryParameters['status'] = requestParameters['status'];
        }

        if (requestParameters['field'] != null) {
            queryParameters['field'] = requestParameters['field'];
        }

        if (requestParameters['order'] != null) {
            queryParameters['order'] = requestParameters['order'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/projects/{taskListId}/tasks`.replace(`{${"taskListId"}}`, encodeURIComponent(String(requestParameters['taskListId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Get all tasks
     */
    async taskControllerGetAll(requestParameters: TaskControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.taskControllerGetAllRaw(requestParameters, initOverrides);
    }

    /**
     * Get a task by its ID
     */
    async taskControllerGetByIdRaw(requestParameters: TaskControllerGetByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taskControllerGetById().'
            );
        }

        if (requestParameters['taskListId'] == null) {
            throw new runtime.RequiredError(
                'taskListId',
                'Required parameter "taskListId" was null or undefined when calling taskControllerGetById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/projects/{taskListId}/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))).replace(`{${"taskListId"}}`, encodeURIComponent(String(requestParameters['taskListId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     * Get a task by its ID
     */
    async taskControllerGetById(requestParameters: TaskControllerGetByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.taskControllerGetByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a task
     */
    async taskControllerUpdateRaw(requestParameters: TaskControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling taskControllerUpdate().'
            );
        }

        if (requestParameters['taskListId'] == null) {
            throw new runtime.RequiredError(
                'taskListId',
                'Required parameter "taskListId" was null or undefined when calling taskControllerUpdate().'
            );
        }

        if (requestParameters['updateTaskDto'] == null) {
            throw new runtime.RequiredError(
                'updateTaskDto',
                'Required parameter "updateTaskDto" was null or undefined when calling taskControllerUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/projects/{taskListId}/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))).replace(`{${"taskListId"}}`, encodeURIComponent(String(requestParameters['taskListId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateTaskDtoToJSON(requestParameters['updateTaskDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     * Update a task
     */
    async taskControllerUpdate(requestParameters: TaskControllerUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.taskControllerUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const TaskControllerGetAllFieldEnum = {
    Id: 'id',
    Title: 'title',
    Status: 'status',
    CreatedAt: 'createdAt',
    UpdatedAt: 'updatedAt'
} as const;
export type TaskControllerGetAllFieldEnum = typeof TaskControllerGetAllFieldEnum[keyof typeof TaskControllerGetAllFieldEnum];
/**
 * @export
 */
export const TaskControllerGetAllOrderEnum = {
    Asc: 'asc',
    Desc: 'desc'
} as const;
export type TaskControllerGetAllOrderEnum = typeof TaskControllerGetAllOrderEnum[keyof typeof TaskControllerGetAllOrderEnum];
/**
 * @export
 */
export const TaskControllerGetAllStatusEnum = {
    NotDone: 'NOT_DONE',
    Done: 'DONE'
} as const;
export type TaskControllerGetAllStatusEnum = typeof TaskControllerGetAllStatusEnum[keyof typeof TaskControllerGetAllStatusEnum];
