`inputs`: an array of `observation` data, with each `observation` containing usage data for a given timestep.

Every component includes an `inputs` field that gets read into plugins as an array. `inputs` are divided into `observations`, each having a `timestamp` and a `duration`. Every observation refers to an element in `inputs` representing some snapshot in time.

Each plugin takes the `inputs` array and applies some calculation or transformation to each observation in the array.

Observations can include any type of data, including human judgment, assumptions, other plugins, APIs, survey data or telemetry.

The separation of timestamps in the `inputs` array determines the temporal granularity of your impact calculations. The more frequent your `observations`, the more accurate your impact assessment.
