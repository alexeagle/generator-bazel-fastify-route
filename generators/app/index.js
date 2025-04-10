'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'folder',
        message: 'Name a folder to create the new package',
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(this.props.folder);
    const packageName = require('node:path').basename(this.props.folder); 
    const routePath = `/route-${packageName}`;
    this.fs.copy(
      this.templatePath('BUILD.bazel'),
      this.destinationPath('BUILD.bazel')
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      { routePath },
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { packageName },
    )
  }
};
