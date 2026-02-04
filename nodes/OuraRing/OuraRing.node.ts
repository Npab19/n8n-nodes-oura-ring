import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class OuraRing implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Oura Ring',
		name: 'ouraRing',
		icon: 'file:oura.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Access Oura Ring data including sleep, activity, and health metrics',
		defaults: {
			name: 'Oura Ring',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ouraRingOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.ouraring.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					// User Data
					{
						name: 'Personal Info',
						value: 'personalInfo',
						description: 'User personal information (age, weight, height, etc.)',
					},
					// Activity
					{
						name: 'Daily Activity',
						value: 'dailyActivity',
						description: 'Daily activity summary data',
					},
					{
						name: 'Workout',
						value: 'workout',
						description: 'Workout data (auto-detected and user-entered)',
					},
					{
						name: 'Session',
						value: 'session',
						description: 'Guided and unguided session data',
					},
					// Sleep
					{
						name: 'Sleep',
						value: 'sleep',
						description: 'Detailed sleep data',
					},
					{
						name: 'Daily Sleep',
						value: 'dailySleep',
						description: 'Daily sleep summary',
					},
					{
						name: 'Sleep Time',
						value: 'sleepTime',
						description: 'Recommended sleep time windows',
					},
					{
						name: 'Rest Mode Period',
						value: 'restModePeriod',
						description: 'Rest mode period data',
					},
					// Health Metrics
					{
						name: 'Daily Readiness',
						value: 'dailyReadiness',
						description: 'Daily readiness score and contributors',
					},
					{
						name: 'Daily SpO2',
						value: 'dailySpo2',
						description: 'Daily blood oxygen (SpO2) data',
					},
					{
						name: 'Daily Stress',
						value: 'dailyStress',
						description: 'Daily stress data',
					},
					{
						name: 'Daily Resilience',
						value: 'dailyResilience',
						description: 'Daily resilience data',
					},
					{
						name: 'Daily Cardiovascular Age',
						value: 'dailyCardiovascularAge',
						description: 'Daily cardiovascular age data',
					},
					{
						name: 'VO2 Max',
						value: 'vo2Max',
						description: 'VO2 max estimates',
					},
					{
						name: 'Heart Rate',
						value: 'heartRate',
						description: 'Heart rate time series data',
					},
					// Ring
					{
						name: 'Ring Configuration',
						value: 'ringConfiguration',
						description: 'Ring configuration and settings',
					},
					// Tags
					{
						name: 'Tag',
						value: 'tag',
						description: 'User-entered tags',
					},
					{
						name: 'Enhanced Tag',
						value: 'enhancedTag',
						description: 'Enhanced tag data',
					},
					// Webhooks
					{
						name: 'Webhook Subscription',
						value: 'webhookSubscription',
						description: 'Manage webhook subscriptions',
					},
				],
				default: 'dailySleep',
			},

			// ============================================================
			// Personal Info Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['personalInfo'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get personal information',
						action: 'Get personal info',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/personal_info',
							},
						},
					},
				],
				default: 'get',
			},

			// ============================================================
			// Tag Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific tag by ID',
						action: 'Get a tag',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/tag/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple tags',
						action: 'Get many tags',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/tag',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Enhanced Tag Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['enhancedTag'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific enhanced tag by ID',
						action: 'Get an enhanced tag',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/enhanced_tag/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple enhanced tags',
						action: 'Get many enhanced tags',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/enhanced_tag',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Workout Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['workout'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific workout by ID',
						action: 'Get a workout',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/workout/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple workouts',
						action: 'Get many workouts',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/workout',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Session Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['session'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific session by ID',
						action: 'Get a session',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/session/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple sessions',
						action: 'Get many sessions',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/session',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Activity Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailyActivity'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily activity record by ID',
						action: 'Get a daily activity',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_activity/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily activity records',
						action: 'Get many daily activities',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_activity',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Sleep Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailySleep'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily sleep record by ID',
						action: 'Get a daily sleep',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_sleep/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily sleep records',
						action: 'Get many daily sleeps',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_sleep',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily SpO2 Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailySpo2'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily SpO2 record by ID',
						action: 'Get a daily SpO2',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_spo2/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily SpO2 records',
						action: 'Get many daily SpO2s',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_spo2',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Readiness Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailyReadiness'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily readiness record by ID',
						action: 'Get a daily readiness',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_readiness/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily readiness records',
						action: 'Get many daily readiness records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_readiness',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Sleep Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sleep'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific sleep record by ID',
						action: 'Get a sleep',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/sleep/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple sleep records',
						action: 'Get many sleeps',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/sleep',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Sleep Time Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sleepTime'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific sleep time record by ID',
						action: 'Get a sleep time',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/sleep_time/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple sleep time records',
						action: 'Get many sleep times',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/sleep_time',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Rest Mode Period Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['restModePeriod'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific rest mode period by ID',
						action: 'Get a rest mode period',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/rest_mode_period/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple rest mode periods',
						action: 'Get many rest mode periods',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/rest_mode_period',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Ring Configuration Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['ringConfiguration'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific ring configuration by ID',
						action: 'Get a ring configuration',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/ring_configuration/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple ring configurations',
						action: 'Get many ring configurations',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/ring_configuration',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Stress Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailyStress'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily stress record by ID',
						action: 'Get a daily stress',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_stress/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily stress records',
						action: 'Get many daily stress records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_stress',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Resilience Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailyResilience'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily resilience record by ID',
						action: 'Get a daily resilience',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_resilience/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily resilience records',
						action: 'Get many daily resilience records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_resilience',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Daily Cardiovascular Age Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dailyCardiovascularAge'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific daily cardiovascular age record by ID',
						action: 'Get a daily cardiovascular age',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/daily_cardiovascular_age/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple daily cardiovascular age records',
						action: 'Get many daily cardiovascular age records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/daily_cardiovascular_age',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// VO2 Max Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['vo2Max'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific VO2 max record by ID',
						action: 'Get a VO2 max',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/usercollection/vO2_max/{{$parameter.documentId}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple VO2 max records',
						action: 'Get many VO2 max records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/vO2_max',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Heart Rate Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['heartRate'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get heart rate time series data',
						action: 'Get many heart rate records',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/usercollection/heartrate',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Webhook Subscription Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new webhook subscription',
						action: 'Create a webhook subscription',
						routing: {
							request: {
								method: 'POST',
								url: '/v2/webhook/subscription',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook subscription',
						action: 'Delete a webhook subscription',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/v2/webhook/subscription/{{$parameter.subscriptionId}}',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific webhook subscription',
						action: 'Get a webhook subscription',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/webhook/subscription/{{$parameter.subscriptionId}}',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all webhook subscriptions',
						action: 'Get many webhook subscriptions',
						routing: {
							request: {
								method: 'GET',
								url: '/v2/webhook/subscription',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
					{
						name: 'Renew',
						value: 'renew',
						description: 'Renew a webhook subscription',
						action: 'Renew a webhook subscription',
						routing: {
							request: {
								method: 'PUT',
								url: '=/v2/webhook/subscription/renew/{{$parameter.subscriptionId}}',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook subscription',
						action: 'Update a webhook subscription',
						routing: {
							request: {
								method: 'PUT',
								url: '=/v2/webhook/subscription/{{$parameter.subscriptionId}}',
								headers: {
									'x-client-id': '={{$credentials.webhookClientId}}',
									'x-client-secret': '={{$credentials.webhookClientSecret}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ============================================================
			// Common Parameters
			// ============================================================

			// Document ID for Get operations
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				required: true,
				default: '',
				description: 'The unique identifier of the document to retrieve',
				displayOptions: {
					show: {
						operation: ['get'],
						resource: [
							'tag',
							'enhancedTag',
							'workout',
							'session',
							'dailyActivity',
							'dailySleep',
							'dailySpo2',
							'dailyReadiness',
							'sleep',
							'sleepTime',
							'restModePeriod',
							'ringConfiguration',
							'dailyStress',
							'dailyResilience',
							'dailyCardiovascularAge',
							'vo2Max',
						],
					},
				},
			},

			// Subscription ID for webhook operations
			{
				displayName: 'Subscription ID',
				name: 'subscriptionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The unique identifier of the webhook subscription',
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
						operation: ['get', 'update', 'delete', 'renew'],
					},
				},
			},

			// Date filters for Get Many operations
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						operation: ['getMany'],
						resource: [
							'tag',
							'enhancedTag',
							'workout',
							'session',
							'dailyActivity',
							'dailySleep',
							'dailySpo2',
							'dailyReadiness',
							'sleep',
							'sleepTime',
							'restModePeriod',
							'ringConfiguration',
							'dailyStress',
							'dailyResilience',
							'dailyCardiovascularAge',
							'vo2Max',
							'heartRate',
						],
					},
				},
				options: [
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Start date for filtering results (ISO 8601 format)',
						routing: {
							request: {
								qs: {
									start_date: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'dateTime',
						default: '',
						description: 'End date for filtering results (ISO 8601 format)',
						routing: {
							request: {
								qs: {
									end_date: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token for retrieving additional results',
						routing: {
							request: {
								qs: {
									next_token: '={{$value}}',
								},
							},
						},
					},
				],
			},

			// Webhook Create/Update fields
			{
				displayName: 'Callback URL',
				name: 'callbackUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://your-domain.com/webhook',
				description: 'The URL to receive webhook notifications',
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
						operation: ['create', 'update'],
					},
				},
				routing: {
					request: {
						body: {
							callback_url: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Verification Token',
				name: 'verificationToken',
				type: 'string',
				required: true,
				default: '',
				description: 'A token used to verify webhook callbacks',
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
						operation: ['create', 'update'],
					},
				},
				routing: {
					request: {
						body: {
							verification_token: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				required: true,
				default: 'create',
				description: 'The type of event to subscribe to',
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Triggered when new data is created',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Triggered when existing data is updated',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Triggered when data is deleted',
					},
				],
				routing: {
					request: {
						body: {
							event_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Data Type',
				name: 'dataType',
				type: 'options',
				required: true,
				default: 'daily_sleep',
				description: 'The type of data to subscribe to',
				displayOptions: {
					show: {
						resource: ['webhookSubscription'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Daily Activity',
						value: 'daily_activity',
					},
					{
						name: 'Daily Readiness',
						value: 'daily_readiness',
					},
					{
						name: 'Daily Sleep',
						value: 'daily_sleep',
					},
					{
						name: 'Daily SpO2',
						value: 'daily_spo2',
					},
					{
						name: 'Daily Stress',
						value: 'daily_stress',
					},
					{
						name: 'Enhanced Tag',
						value: 'enhanced_tag',
					},
					{
						name: 'Ring Configuration',
						value: 'ring_configuration',
					},
					{
						name: 'Session',
						value: 'session',
					},
					{
						name: 'Sleep',
						value: 'sleep',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Workout',
						value: 'workout',
					},
				],
				routing: {
					request: {
						body: {
							data_type: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
