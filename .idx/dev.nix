{ pkgs, ... }: {
  # The nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # The list of packages to make available in the environment.
  packages = [
    # Specifies Node.js version 22.
    pkgs.nodejs_22
  ];

  # A set of environment variables to be defined in the workspace.
  idx = {
    # The list of VS Code extensions to install in the editor.
    extensions = [ "dbaeumer.vscode-eslint" ];

    # Workspace lifecycle hooks.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        npm-install = "npm install";
      };
    };
    
    # Configure a web preview for your application.
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
