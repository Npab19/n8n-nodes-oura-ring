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
			displayName: 'Scopes',
			name: 'scope',
			type: 'multiOptions',
			default: ['daily', 'personal'],
			description: 'Select the scopes to request access to. Choose the data types you need access to.',
			options: [
				{
					name: 'Daily (Sleep, Activity, Readiness)',
					value: 'daily',
					description: 'Daily summaries of sleep, activity and readiness',
				},
				{
					name: 'Email',
					value: 'email',
					description: 'Email address of the user',
				},
				{
					name: 'Heart Health (Cardiovascular Age, VO2 Max)',
					value: 'heart_health',
					description: 'Cardiovascular age and VO2 max data',
				},
				{
					name: 'Heart Rate',
					value: 'heartrate',
					description: 'Heart rate time series data',
				},
				{
					name: 'Personal',
					value: 'personal',
					description: 'Personal information (gender, age, height, weight)',
				},
				{
					name: 'Ring Configuration',
					value: 'ring_configuration',
					description: 'Ring configuration data',
				},
				{
					name: 'Session',
					value: 'session',
					description: 'Guided and unguided sessions in the Oura app',
				},
				{
					name: 'SpO2',
					value: 'spo2',
					description: 'SpO2 average recorded during sleep',
				},
				{
					name: 'Stress',
					value: 'stress',
					description: 'Daily stress data',
				},
				{
					name: 'Tag',
					value: 'tag',
					description: 'User-entered tags',
				},
				{
					name: 'Workout',
					value: 'workout',
					description: 'Auto-detected and user-entered workouts',
				},
			],
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
