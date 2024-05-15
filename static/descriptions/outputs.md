`outputs`: When Impact Framework computes a manifest file, it appends new data to the manifest file and the final result is an enriched manifest that includes all the configuration and contextual data, the input data, and the results of executing each plugin. This means the output file is completely auditable - the manifest file can be recovered simply by deleting the `outputs` section of the output file.

Here's an example output file:

```yaml
name: e-mem
description: null
tags: null
initialize:
  plugins:
    e-mem:
      path: "@grnsft/if-plugins"
      method: EMem
tree:
  children:
    child:
      pipeline:
        - e-mem
      config: null
      defaults:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          memory/utilization: 40
          memory/capacity: 1
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          mem-util: 40
          memory/capacity: 1
          memory/energy: 0.15200000000000002
```
