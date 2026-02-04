# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This repository is for developing custom n8n nodes. n8n is a workflow automation platform that allows users to connect different services and automate tasks.

## Common Commands

### Development Environment Setup
- **Node.js Requirements**: Install Node.js (minimum version 18.17.0) and npm
- **n8n Installation**: Install global n8n instance with `npm install n8n -g`
- **Node Starter**: Clone n8n-nodes-starter template repository from GitHub
- **Dependencies**: Run `npm i` to install dependencies including the linter
- **Git**: Required for cloning starter template and version control
- **IDE Setup**: Use VS Code with recommended extensions for n8n node linter warnings

### Build Process
- **Build Command**: Run `npm run build` to compile TypeScript node code
- **Local Linking**: Use `npm link <node-name>` in n8n's nodes directory for testing
- **Node Location**: Place custom nodes in `~/.n8n/custom` (npm) or `~/.n8n/<custom-name>`
- **Linting**: Run `npm run lint` to check code quality, `npm run lintfix` to auto-fix issues
- **Local Testing**: Start n8n at http://localhost:5678 and search for nodes by node name (not package name)
- **Verification**: Use `npx @n8n/scan-community-package n8n-nodes-PACKAGE` before submission

### Development Workflow
1. **Planning Phase**: Complete node purpose, type selection, and building style decision
2. **Environment Setup**: Clone n8n-nodes-starter, install dependencies, configure development tools
3. **Tutorial Selection**: Follow either declarative (NASA API) or programmatic (SendGrid) tutorial
4. **Implementation**: Build node following chosen style with proper TypeScript implementation
5. **Local Testing**: Link node to local n8n instance and test functionality thoroughly
6. **Quality Assurance**: Run linter, verify against guidelines, test edge cases
7. **Iteration**: Refine based on testing feedback and verification requirements

## Node Development Architecture

### File Structure

n8n nodes require specific file components organized following n8n's file structure guidelines:

#### Required File Structure

**Single vs Multi-Node Packages**:
- Single node: Basic structure with one node per npm package
- Multi-node: Each node has its own directory in the `nodes` directory

**Core File Requirements**:
- `nodes/[NodeName]/[NodeName].node.ts` - Main node implementation (TypeScript)
- `nodes/[NodeName]/[NodeName].node.json` - Codex file with metadata
- `credentials/[NodeNameApi].credentials.ts` - Authentication handling

**Base Files (.node.ts)**:
- Contains core node code implementing `INodeType` interface
- Includes `description` object defining the node
- For declarative: Uses JSON-based configuration with routing in operations
- For programmatic: Implements custom `execute()` method with full TypeScript control
- Can be modular (split across multiple files) for complex nodes

**Codex Files (.node.json)**:
- Filename must match node base filename exactly
- Contains metadata for node categorization in n8n's nodes panel
- Defines node categories and organizational information

**Credentials Files (.credentials.ts)**:
- Format: `<node-name>.credentials.ts` (e.g., `MyNode.credentials.ts`)
- Defines authorization methods affecting Credentials modal display
- Must reflect authentication requirements of target service
- Supports OAuth2, API tokens, service accounts, username/password
- Handles multi-platform integration (AWS, Google, Azure, etc.)

#### Development Environment Setup
- Set up development environment following n8n's setup guide
- Choose appropriate node file structure based on project needs
- Organize files according to declarative or programmatic style requirements
- Follow n8n's naming conventions and directory structure

#### Project Organization Considerations
- Separate node logic from UI definitions
- Organize credentials and authentication separately
- Structure files for maintainability and clarity
- Follow n8n's established patterns for consistency

### Key Concepts

#### Node Building Styles (Choose Development Method)

**Declarative-style Nodes** (Recommended for Most Nodes):
- **JSON-based Configuration**: Uses JSON syntax for simpler implementation
- **Lower Risk**: Less chance of introducing bugs due to structured approach
- **Future-proof**: More maintainable and compatible with n8n updates
- **REST API Focus**: Designed specifically for REST API integrations
- **Routing-based**: Uses routing in operations object to define API call details
- **Tutorial Example**: NASA API integration (planetary/apod and mars-photos endpoints)
- **Best for**: Standard REST APIs, CRUD operations, straightforward integrations
- **Key Feature**: Uses `requestDefaults` for basic API setup and routing for operations

**Programmatic-style Nodes** (Required for Complex Cases):
- **Full TypeScript Control**: Complete flexibility with custom execute() method
- **Required When**: Non-REST APIs, GraphQL APIs, external dependencies, data transformation
- **Execute Method**: Custom implementation that reads input data and parameters
- **Data Handling**: Access to `this.getInputData()` and user-set parameters including credentials
- **Tutorial Example**: SendGrid integration for contact creation
- **Best for**: Complex business logic, custom data processing, unique API patterns
- **Key Feature**: Returns `INodeExecutionData` instances with full control over processing

**Selection Criteria**:
- **Choose Declarative** if: REST API, standard operations, simpler maintenance desired
- **Choose Programmatic** if: Non-REST API, complex logic, data transformation, external dependencies
- **Must Use Programmatic** for: GraphQL APIs, complex data manipulation, external libraries

#### Programmatic Development Considerations
- **TypeScript/JavaScript Expertise**: Requires solid programming skills for custom implementation
- **Complex Logic**: Ideal for nodes that need sophisticated data processing or business rules
- **Custom API Handling**: Perfect for APIs with unique authentication or response patterns
- **Advanced Error Handling**: Allows for custom error processing and recovery strategies
- **Performance Optimization**: Enables fine-tuned performance for specific use cases
- **Unique Workflows**: Best when standard n8n patterns don't fit your requirements

#### Node Types (Choose Based on Purpose)

**Core Nodes**: Fundamental building blocks for workflows
- Trigger nodes (Manual Trigger, Schedule Trigger)
- Data manipulation (Filter, Merge, Set)
- Utility functions (Code, Wait, HTTP Request)
- Use for: Basic workflow operations and data transformation

**Action Nodes**: Specific integrations with applications and services
- CRM systems (Salesforce, HubSpot)
- Communication tools (Slack, Discord)
- Productivity apps (Trello, Asana)
- Cloud services (Google Drive, AWS)
- Use for: Connecting workflows to external platforms and services

**Trigger Nodes**: Initiate workflows based on specific events
- Webhook triggers for external system events
- Scheduled triggers for time-based automation
- Platform-specific triggers (GitHub, Slack, Mailchimp)
- Use for: Starting workflows automatically based on conditions

**Cluster Nodes**: Advanced AI and data processing capabilities
- Root nodes: AI Agents, LLM Chains
- Sub-nodes: Embeddings, Chat Models, Memory Managers
- Use for: AI-powered workflows and complex data processing

**Credentials Nodes**: Authentication management
- Secure connection methods for various platforms
- OAuth, API keys, and other authentication types
- Use for: Managing secure access to external services

#### Development Planning Process
1. **Determine Node Purpose**: Define specific problem solved and primary function
2. **Select Node Type**: 
   - **Core**: Data manipulation (Filter, Merge, Aggregate), workflow control (If, Switch, Wait), utilities (Code, AI Transform)
   - **Action**: App/service integrations (Google services, Slack, CRM systems, databases)
   - **Trigger**: Event-based workflow initiation (webhooks, schedules, platform events)
   - **Cluster**: Advanced AI capabilities (AI Agents, LLM Chains, Vector Stores, Chat Models)
   - **Credentials**: Authentication management for various platforms and services
3. **Choose Development Style**: Based on API type and complexity requirements
   - **Declarative**: For REST APIs, standard operations, JSON-based configuration
   - **Programmatic**: For GraphQL, complex logic, data transformation, external dependencies
4. **Design UI/UX**: Plan intuitive parameter structure and user experience
   - Group related parameters logically
   - Use appropriate input types (text, dropdown, toggle)
   - Implement progressive disclosure (basic → advanced options)
   - Follow n8n's established UI patterns and conventions
5. **Plan File Structure**: Organize according to single vs multi-node package requirements
   - Base file structure: `nodes/[NodeName]/[NodeName].node.ts`
   - Codex file: `nodes/[NodeName]/[NodeName].node.json`
   - Credentials: `credentials/[NodeNameApi].credentials.ts`
6. **Consider Integration**: Plan data flow, authentication, and workflow compatibility

#### Node Selection Guidelines
- **Workflow purpose**: What specific problem does your node solve?
- **Required integrations**: Which external services need to be connected?
- **Data transformation needs**: How complex is the data processing required?
- **Automation complexity**: Does it need simple triggers or advanced AI capabilities?

### Node UI Design Principles

#### Core UI Components
- **Node Interface**: Modular design that integrates with n8n's drag-and-drop workflow editor
- **Parameter Configuration**: Logical organization of settings and options
- **Input/Output Connections**: Clear data flow visualization and connection points
- **Error Handling Display**: User-friendly error messages and validation feedback
- **Workflow Components**: Nodes, connections, and sticky notes for documentation
- **Execution Modes**: Support for manual, partial, and production executions

#### Design Best Practices
- **Intuitive Layout**: Organize parameters in logical groups and hierarchies
- **Clear Labeling**: Use descriptive names for parameters and options
- **Progressive Disclosure**: Show basic options first, advanced settings when needed
- **Consistent Patterns**: Follow n8n's established UI patterns and conventions
- **Responsive Design**: Ensure node interfaces work across different screen sizes

#### Parameter Organization
- Group related parameters together
- Use appropriate input types (text, dropdown, toggle, etc.)
- Provide helpful descriptions and tooltips
- Implement conditional parameter display based on selections
- Include default values and validation rules

### Development Best Practices

#### Code Standards
- Follow n8n's official code standards and conventions
- Implement proper error handling throughout node logic
- Use versioning appropriately for node updates
- Design intuitive and user-friendly UI elements

#### Development Process
1. **Planning Phase**: 
   - Determine node's primary purpose and use case
   - Select appropriate node type (core/action/trigger/cluster)
   - Choose development style (declarative vs programmatic)
2. **Design Phase**: 
   - Design intuitive UI and parameter structure
   - Plan input/output data flow
   - Create user experience mockups
3. **Implementation Phase**: 
   - Build according to chosen style and n8n standards
   - Implement robust error handling
   - Follow versioning strategy
4. **Testing Phase**: 
   - Run node locally using n8n's testing framework
   - Test various input scenarios and edge cases
5. **Refinement Phase**: 
   - Iterate based on testing feedback
   - Verify against n8n guidelines

#### Key References and Resources
- **Official Tutorials**:
  - "Tutorial: Build a declarative-style node"
  - "Tutorial: Build a programmatic-style node"
- **Reference Materials**:
  - Node UI elements documentation for component details
  - Code standards and verification guidelines
  - Error handling best practices
  - Versioning strategies for node updates
  - Node file structure guidelines
- **Development Support**:
  - Base files reference and implementation (including declarative-style parameters)
  - Credentials files for authentication handling
  - HTTP request helpers for API integrations
  - Local testing and development tools
  - Node file structure guidelines for both styles
  - Development environment setup instructions

### Testing and Local Development

#### Local Development Setup
- **Prerequisites**: Node.js 18.17.0+, npm, git, global n8n installation
- **Starter Template**: Generate repository from `n8n-nodes-starter` template
- **Installation**: Run `npm i` to install dependencies including linter
- **Development**: Browse examples in `/nodes` and `/credentials` directories
- **Package Configuration**: Update `package.json` with your project details
- **Local n8n Instance**: Required for testing nodes during development

#### Testing Strategies
- **Manual Testing**: Run node in local n8n instance at http://localhost:5678
- **Automated Testing**: Use n8n's linter for static code analysis and issue detection
- **npm Link Testing**: Link node package to local n8n installation for live testing
- **Search Testing**: Test node discovery by searching node name (not package name)
- **Edge Case Testing**: Test various input scenarios and error conditions
- **Authentication Testing**: Validate credential files and authentication flows
- **API Integration Testing**: Test HTTP requests and response handling
- **UI/UX Testing**: Validate parameter configuration and user experience

#### Quality Assurance
- **Linter Compliance**: Ensure `npm run lint` passes without errors
- **TypeScript Standards**: Use TypeScript for all node development (speeds development, reduces bugs)
- **Verification Scan**: Pass `npx @n8n/scan-community-package` before submission
- **MIT License**: Ensure package uses MIT license for community submission
- **No Runtime Dependencies**: Verified community nodes cannot include external runtime dependencies
- **English Only**: All interfaces and documentation must be in English
- **Data Integrity**: Never modify incoming data (`this.getInputData()`), clone and return new data
- **Error Handling**: Implement robust error handling and user-friendly error messages

#### Development Tools
- **Node Linter**: `eslint-plugin-n8n-nodes-base` for static analysis and auto-fixing
- **GitHub Actions**: Automated linter execution on pull requests in main repository
- **VS Code Extensions**: Recommended extensions for real-time linter warnings
- **Debug Logging**: Add log messages during development for debugging assistance
- **npm Scripts**: `npm run lint` (check), `npm run lintfix` (auto-fix)
- **Community Package Scanner**: Automated linting before npm package publishing

### Practical Implementation Examples

#### Declarative Style Implementation (NASA API Example)
- **Use Case**: REST API integration with NASA's planetary/apod and mars-photos endpoints
- **Key Components**: 
  - `requestDefaults` with `baseURL: 'https://api.nasa.gov'`
  - Resource object defining API endpoints
  - Operations with routing configuration for each API call
  - Authentication via NASA API key
- **File Structure**: `NasaPics.node.ts`, `NasaPics.node.json`, `NasaPicsApi.credentials.ts`

#### Programmatic Style Implementation (SendGrid Example)
- **Use Case**: SendGrid contact creation with custom business logic
- **Key Components**:
  - Custom `execute()` method implementation
  - Access to `this.getInputData()` for processing input items
  - Parameter handling for user-configured settings
  - Credential access for API authentication
  - Return `INodeExecutionData` instances
- **File Structure**: `FriendGrid.node.ts` with full TypeScript control

#### Common Implementation Patterns
- **Data Handling**: Clone incoming data rather than modifying original
- **Error Management**: Implement comprehensive error handling with user-friendly messages
- **Authentication**: Support multiple auth methods (OAuth2, API tokens, service accounts)
- **Versioning**: Use proper versioning for node updates and backwards compatibility
- **Logging**: Add debug logging during development for troubleshooting

### Node Deployment
- **Community Nodes**: Submit verified nodes to n8n community for public installation via GUI
- **Private Node Installation**: Deploy custom nodes for organizational use with manual installation
- **Verification Process**: Community nodes must pass technical guidelines and automated checks
- **Distribution Methods**: npm packages, GitHub repositories, private organizational deployment

### Documentation References

#### Core Documentation
- **Node Creation Overview**: https://docs.n8n.io/integrations/creating-nodes/overview/
- **Planning Guide**: https://docs.n8n.io/integrations/creating-nodes/plan/
- **Node Types Guide**: https://docs.n8n.io/integrations/creating-nodes/plan/node-types/
- **Node UI Design**: https://docs.n8n.io/integrations/creating-nodes/plan/node-ui-design/

#### Build References
- **Development Environment Setup**: https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/
- **Declarative Style Tutorial**: https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/
- **Programmatic Style Tutorial**: https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/
- **Choose Building Style**: https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/
- **Node UI Elements**: https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/
- **Code Standards**: https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/
- **Error Handling**: https://docs.n8n.io/integrations/creating-nodes/build/reference/error-handling/
- **Node Versioning**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/
- **Node File Structure**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure/

#### Advanced References
- **Node Base Files Structure**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/
- **Standard Parameters**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/
- **Declarative Style Parameters**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/
- **Programmatic Style Parameters**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/
- **Execute Method**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/
- **Credentials Files**: https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
- **Codex Files**: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/
- **HTTP Helpers**: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/
- **Paired Items**: https://docs.n8n.io/integrations/creating-nodes/build/reference/paired-items/

#### Testing and Deployment
- **Testing Overview**: https://docs.n8n.io/integrations/creating-nodes/test/
- **Run Node Locally**: https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/
- **Node Linter**: https://docs.n8n.io/integrations/creating-nodes/test/node-linter/
- **Troubleshooting**: https://docs.n8n.io/integrations/creating-nodes/test/troubleshooting-node-development/
- **Deployment Guide**: https://docs.n8n.io/integrations/creating-nodes/deploy/
- **Submit Community Nodes**: https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/
- **Install Private Nodes**: https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/

#### Quality Guidelines
- **UX Guidelines**: https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/
- **Verification Guidelines**: https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/

#### Essential Resources
- **n8n-nodes-starter**: https://github.com/n8n-io/n8n-nodes-starter (Official starter template)
- **NASA Tutorial Example**: https://github.com/roberto-chavarria/declarative_style_n8n_node_nasa
- **Community Support**: https://community.n8n.io/ (Development questions and troubleshooting)


https://www.anthropic.com/engineering/claude-code-best-practices