import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OuraRingOAuth2Api implements ICredentialType {
	name = 'ouraRingOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Oura Ring OAuth2 API';
	documentationUrl = 'https://cloud.ouraring.com/docs/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://cloud.ouraring.com/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.ouraring.com/oauth/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: 'daily personal email',
			description: 'Space-separated list of scopes. Available: daily, personal, email, heartrate, workout, tag, session, spo2, ring_configuration, stress, heart_health',
		},
		{
			displayName: 'Webhook Client ID',
			name: 'webhookClientId',
			type: 'string',
			default: '',
			description: 'Client ID for webhook subscription management (optional - only needed for webhook operations)',
			placeholder: 'Your OAuth Application Client ID',
		},
		{
			displayName: 'Webhook Client Secret',
			name: 'webhookClientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Client Secret for webhook subscription management (optional - only needed for webhook operations)',
			placeholder: 'Your OAuth Application Client Secret',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.oauthTokenData.access_token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.ouraring.com',
			url: '/v2/usercollection/personal_info',
		},
	};
}
