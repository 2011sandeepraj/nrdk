import {BaseCommand} from '../base'
import * as FLAGS from '../flags'

export default class Build extends BaseCommand {
  static description = 'describe the command here'

  static flags = {
    [FLAGS.FlagNames.CONFIG_SCRIPT]: FLAGS.flagConfigScript,
    [FLAGS.FlagNames.BUILD_SCRIPT]: FLAGS.flagBuildScript,
    [FLAGS.FlagNames.ENV]: FLAGS.flagEnvSpec,
    [FLAGS.FlagNames.PULL_REQUEST_NUMBER]: FLAGS.flagPullRequestNumberSpec,
    [FLAGS.FlagNames.GIT_REMOTE_NAME]: FLAGS.flagGitRemoteName,
    [FLAGS.FlagNames.GIT_REMOTE_URL]: FLAGS.flagGitRemoteUrl,
    [FLAGS.FlagNames.GIT_BRANCH]: FLAGS.flagGitBranch,
    [FLAGS.FlagNames.GIT_BRANCH_REMOTE]: FLAGS.flagGitBranchRemote,
    [FLAGS.FlagNames.DEV_MODE]: FLAGS.flagDevMode,
    [FLAGS.FlagNames.GIT_CHANGE_TARGET]: FLAGS.flagGitChangeTarget,
    [FLAGS.FlagNames.ARCHETYPE]: FLAGS.flagArchetype,
  }

  async run() {
    const {flags} = this.parse(Build)
    await FLAGS.applyFlagDefaults(flags)
    this.debug('flags', flags)
    if (flags.archetype) {
      const settings = FLAGS.loadConfigScript(flags)
      const task = FLAGS.loadScript(flags, FLAGS.FlagNames.BUILD_SCRIPT)
      if (task.__esModule === true) {
        task.default(Object.assign(settings, {phase: 'build'}))
      } else {
        task(Object.assign(settings, {phase: 'build'}))
      }
    } else {
      const settings = FLAGS.loadConfigScript(flags)
      this.debug('settings', settings)
      const task = FLAGS.loadScript(flags, FLAGS.FlagNames.BUILD_SCRIPT)
      task(Object.assign(settings, {phase: 'build'}))
    }
  }
}
