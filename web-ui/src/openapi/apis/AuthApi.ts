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
  EmailAuthPayload,
  RefreshPayload,
  TokenResponse,
} from '../models/index';
import {
    EmailAuthPayloadFromJSON,
    EmailAuthPayloadToJSON,
    RefreshPayloadFromJSON,
    RefreshPayloadToJSON,
    TokenResponseFromJSON,
    TokenResponseToJSON,
} from '../models/index';

export interface AuthControllerRefreshRequest {
    refreshPayload: RefreshPayload;
}

export interface AuthControllerSignInViaEmailRequest {
    emailAuthPayload: EmailAuthPayload;
}

export interface AuthControllerSignUpViaEmailRequest {
    emailAuthPayload: EmailAuthPayload;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Refresh access tokens
     */
    async authControllerRefreshRaw(requestParameters: AuthControllerRefreshRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TokenResponse>> {
        if (requestParameters['refreshPayload'] == null) {
            throw new runtime.RequiredError(
                'refreshPayload',
                'Required parameter "refreshPayload" was null or undefined when calling authControllerRefresh().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/refresh`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RefreshPayloadToJSON(requestParameters['refreshPayload']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenResponseFromJSON(jsonValue));
    }

    /**
     * Refresh access tokens
     */
    async authControllerRefresh(requestParameters: AuthControllerRefreshRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TokenResponse> {
        const response = await this.authControllerRefreshRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Authenticate a user via Email
     */
    async authControllerSignInViaEmailRaw(requestParameters: AuthControllerSignInViaEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TokenResponse>> {
        if (requestParameters['emailAuthPayload'] == null) {
            throw new runtime.RequiredError(
                'emailAuthPayload',
                'Required parameter "emailAuthPayload" was null or undefined when calling authControllerSignInViaEmail().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/sign-in/email`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmailAuthPayloadToJSON(requestParameters['emailAuthPayload']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenResponseFromJSON(jsonValue));
    }

    /**
     * Authenticate a user via Email
     */
    async authControllerSignInViaEmail(requestParameters: AuthControllerSignInViaEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TokenResponse> {
        const response = await this.authControllerSignInViaEmailRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Register a user via Email
     */
    async authControllerSignUpViaEmailRaw(requestParameters: AuthControllerSignUpViaEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TokenResponse>> {
        if (requestParameters['emailAuthPayload'] == null) {
            throw new runtime.RequiredError(
                'emailAuthPayload',
                'Required parameter "emailAuthPayload" was null or undefined when calling authControllerSignUpViaEmail().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/sign-up/email`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmailAuthPayloadToJSON(requestParameters['emailAuthPayload']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenResponseFromJSON(jsonValue));
    }

    /**
     * Register a user via Email
     */
    async authControllerSignUpViaEmail(requestParameters: AuthControllerSignUpViaEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TokenResponse> {
        const response = await this.authControllerSignUpViaEmailRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
