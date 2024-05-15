`config`: contains configuration for each plugin that applies just inside this specific component.

Node level configuration is intended to include any configuration data that is constant from timestep to timestep, but varies across components in the tree. Values that are constant both within _and_ across components should go in global config instead.

The plugin must be written such that it _expects_ these values to exist in node level config and explicitly reads them in. The values expected in node level config should be defined in the plugin README.
