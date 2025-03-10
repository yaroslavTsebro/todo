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

import { mapValues } from '../runtime';
import type { Task } from './Task';
import {
    TaskFromJSON,
    TaskFromJSONTyped,
    TaskToJSON,
} from './Task';

/**
 * 
 * @export
 * @interface TaskList
 */
export interface TaskList {
    /**
     * TaskList ID
     * @type {string}
     * @memberof TaskList
     */
    id: string;
    /**
     * TaskList name
     * @type {string}
     * @memberof TaskList
     */
    name: string;
    /**
     * TaskList description
     * @type {string}
     * @memberof TaskList
     */
    description: string | null;
    /**
     * List of tasks in the task list
     * @type {Array<Task>}
     * @memberof TaskList
     */
    tasks: Array<Task>;
    /**
     * Creation date
     * @type {Date}
     * @memberof TaskList
     */
    createdAt: Date;
    /**
     * Last update date
     * @type {Date}
     * @memberof TaskList
     */
    updatedAt: Date | null;
}

/**
 * Check if a given object implements the TaskList interface.
 */
export function instanceOfTaskList(value: object): value is TaskList {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('tasks' in value) || value['tasks'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function TaskListFromJSON(json: any): TaskList {
    return TaskListFromJSONTyped(json, false);
}

export function TaskListFromJSONTyped(json: any, ignoreDiscriminator: boolean): TaskList {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': json['description'],
        'tasks': json['tasks'] ? ((json['tasks'] as Array<any>).map(TaskFromJSON)): [],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (json['updatedAt'] == null ? null : new Date(json['updatedAt'])),
    };
}

export function TaskListToJSON(value?: TaskList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'name': value['name'],
        'description': value['description'],
        'tasks': ((value['tasks'] as Array<any>).map(TaskToJSON)),
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': (value['updatedAt'] == null ? null : (value['updatedAt'] as any).toISOString()),
    };
}

