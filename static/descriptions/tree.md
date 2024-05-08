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
