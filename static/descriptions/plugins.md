# Plugins

Plugins are self-contained units of code that do one thing. They can be loaded into IF and chained together in a pipeline so that simple individual plugins can form a complicated procedure for computing a manifest file.

## What are plugins?

A plugin converts an input into some output, for example, some plugins convert an input of CPU utilization into an output of energy.

There are many different plugins: Boavizta, Cloud Carbon Footprint, Climatiq are some great examples of open-source IMs, there are many other closed source, commercial and private plugins being built in-house inside organizations.

The set of plugins is increasing; however, no single plugin can cover all impacts, scenarios, environments, contexts, and use cases. To calculate the end-to-end impact of a software application, you need to stitch together many different plugins. Plugins differ in fundamental ways in the inputs inputs they accept, their interface, their calculation methodology, their outputs, their granularity, and their coverage.

We expect the choice of which plugin to use for which software component to come down to an expert decision by a green software professional.

## Why do we need to standardize the interface to plugins?

Currently, suppose you want to consume a plugin in your measurement application. In that case, you must craft custom code to interact with a custom interface since every plugin has its unique interface. Swapping one plugin for another requires code changes, and comparing plugins or validating their accuracy/precision is challenging.

If every plugin exposes the same interface, then those plugins can easily be plugged into different applications, swapped in and out, upgraded, and compared.

Our thesis is simple: if we want a large, vibrant ecosystem of people and tooling around measurement, we need a standard, common interface for all plugins.

Ecosystems grow and thrive through standards.

You can explore more in the plugins reference docs or our plugin building tutorial.
