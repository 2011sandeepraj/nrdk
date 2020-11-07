import { RepositoryReference } from '../service/axios-bitbucket-client';

export interface IssueReferenceByUrl {
  url: string;
}

export interface ReferenceByKey {
  key: string;
}

export interface PullRequestReference {
  url: string;
  number?: string;
  sourceBranch: string;
  targetBranch: string;
  repository: RepositoryReference;
}

export interface NameAndId {
  id?: string;
  name?: string;
}
export interface ValueAndId {
  id?: string;
  value?: string;
}

export type IssueResolution = NameAndId

export type IssueStatus = NameAndId

export type IssueType = NameAndId

export type Version = NameAndId

export interface Issue {
  id?: string;
  key?: string;
  fields?: {
    project?: ReferenceByKey;
    summary?: string;
    description?: string;
    status?: IssueStatus;
    issuetype?: IssueType;
    fixVersions?: Version[];
    /** Target Environment */
    customfield_10121?: ValueAndId;
    labels?: string[];
    [key: string]: any;
  };
}
export type IssueReference = Issue

export interface DeploymentArgument {
  issue: IssueReference;
  pullRequest: PullRequestReference;
  targetEnvironment: string;
}
export interface StartDeploymentArgument extends DeploymentArgument {
  dryrun?: boolean;
  errors?: any[];
}

export type ProjectReference = ReferenceByKey
