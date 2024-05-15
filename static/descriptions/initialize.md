**Initialize**

The initialize section is where you define which plugins will be used in your manifest file and provide the global configuration for them. Impact Framework uses the initialize section to instantiate each plugin. A plugin cannot be invoked elsewhere in the manifest file unless it is included in this section. Below is sample for initialization:

```yaml
initialize:
  plugins:
    <PLUGIN-NAME-HERE>:
      method: <METHOD-NAME-HERE>
  outputs: ["csv", "yaml", "log"]
```

Where required values are:

- `method`: the name of the function exported by the plugin.
- `path`: the path to the plugin code. For example, for a plugin from our standard library installed from npm, this value would be `@grnsft/if-plugins`

There is also an optional `global-config` field that can be used to set _global_ configuration that is common to a plugin wherever it is invoked across the entire manifest file.

Impact Framework uses the `initialize` section to instantiate each plugin. A plugin cannot be invoked elsewhere in the manifest file unless it is included in this section.

`outputs` is a list of possible export types (currently `csv`, `yaml`, and `log` are supported).
