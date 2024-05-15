The `tree` section of a manifest file defines the topology of all the components being measured. The shape of the `tree` defines the grouping of components. It describes the architecture of the application being studied and contains all the usage observations for each component. The tree has individual components such as leaves, intermediate nodes representing groupings, and the top level is the root.

For example, a web application could be organized as follows:

```yaml
tree:
  children:
    front-end:
      children:
        build-pipeline:
          children:
            vercel:
            github-pages:
    backend-database:
      children:
        server1:
        server2:
        server3:
    front-end:
    networking:
```

This example has a relatively straightforward structure with a maximum of 3 levels of nesting. You can continue to nest components to any depth.

Each component has some configuration, some input data, and a plugin pipeline.

- `pipeline`: a list of plugins that should be executed for a specific component
- `config`: contains configuration for each plugin that applies just inside this specific component.
- `defaults`: fallback values that IF defaults to if they are not present in an input observation.
- `inputs`: an array of `observation` data, with each `observation` containing usage data for a given timestep.

If a component does not include its own `pipeline`, `config`, or `inputs` values, they are inherited from the closest parent.

Here's an example of a moderately complex tree:

```yaml
tree:
  children:
    child-0:
      pipeline:
        - sci-e
      children:
        child-0-1:
          pipeline:
            - sci-e
          config: null
          defaults: null
          inputs:
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 50
              energy-network: 0.000811
          outputs:
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 50
              energy-network: 0.000811
              energy: 0.000811
        child-0-2:
          children:
            child-0-2-1:
              pipeline:
                - sci-e
              config: null
              defaults: null
              inputs:
                - timestamp: 2023-07-06T00:00
                  duration: 10
                  cpu-util: 50
                  energy-network: 0.000811
              outputs:
                - timestamp: 2023-07-06T00:00
                  duration: 10
                  cpu-util: 50
                  energy-network: 0.000811
                  energy: 0.000811
```
