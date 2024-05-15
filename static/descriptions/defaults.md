`defaults`: fallback values that IF defaults to if they are not present in an input observation.

Defaults are fallback values that are only used if a given value is missing in the inputs array. For example, if you have a value that could feasibly be missing in a given timestep, perhaps because your plugin relies on a third party API that can fail, you can provide a value in `defaults` that can be used as a fallback value.

The values in defaults are applied to every timestep where the given value is missing. This means that as well as acting as a fallback `defaults` can be used as a convenience tool for efficiently adding a constant value to every timestep in your inputs array.
