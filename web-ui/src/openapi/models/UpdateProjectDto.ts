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
/**
 * 
 * @export
 * @interface UpdateProjectDto
 */
export interface UpdateProjectDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateProjectDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateProjectDto
     */
    description?: string;
}

/**
 * Check if a given object implements the UpdateProjectDto interface.
 */
export function instanceOfUpdateProjectDto(value: object): value is UpdateProjectDto {
    return true;
}

export function UpdateProjectDtoFromJSON(json: any): UpdateProjectDto {
    return UpdateProjectDtoFromJSONTyped(json, false);
}

export function UpdateProjectDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateProjectDto {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'description': json['description'] == null ? undefined : json['description'],
    };
}

export function UpdateProjectDtoToJSON(value?: UpdateProjectDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'description': value['description'],
    };
}

