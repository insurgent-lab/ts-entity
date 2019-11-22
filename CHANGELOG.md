## [2.0.1](https://github.com/insurgent-lab/ts-entity/compare/v2.0.0...v2.0.1) (2019-11-22)


### Bug Fixes

* re-add index to build ([738a2d4](https://github.com/insurgent-lab/ts-entity/commit/738a2d4717e477670df30feb3b13834dfdc6835f))

# [2.0.0](https://github.com/insurgent-lab/ts-entity/compare/v1.7.1...v2.0.0) (2019-11-21)


### Features

* add JSON data type validation ([f5dccc1](https://github.com/insurgent-lab/ts-entity/commit/f5dccc1e83020f2ddbaf0e9a929b5f002f0e73bf))


### BREAKING CHANGES

* Disabled annotated aliases
* Disabled snake_case <=> camelCase conversions
* toJson signature from `toJson(toSnake: boolean = true, asString: boolean = false)` to `toJson(asString: boolean = false)`

# [1.7.1](https://github.com/insurgent-lab/ts-entity/compare/v1.6.0...v1.7.1) (2019-11-21)


### Features

* add @Default decorator ([5b0f8c8](https://github.com/insurgent-lab/ts-entity/commit/5b0f8c86107422e8d5cd57f2d2a792ad928e7e5e))

# [1.6.0](https://github.com/insurgent-lab/ts-entity/compare/v1.5.0...v1.6.0) (2019-11-21)


### Features

* deferred types ([8b0852e](https://github.com/insurgent-lab/ts-entity/commit/8b0852e9f24eb921c123f9f82dc0001f4d73547b))

# [1.5.0](https://github.com/insurgent-lab/ts-entity/compare/v1.4.0...v1.5.0) (2019-11-21)


### Features

* allow turning off case conversion ([738de27](https://github.com/insurgent-lab/ts-entity/commit/738de27891d085f2313a09180c2f5113f70947fc))

# [1.4.0](https://github.com/insurgent-lab/ts-entity/compare/v1.3.1...v1.4.0) (2019-11-21)


### Features

* ensure null values are preserved ([b3bc7ae](https://github.com/insurgent-lab/ts-entity/commit/b3bc7ae3baf2ef33fbfc856f3250459637f7bc26))

# [1.3.1](https://github.com/insurgent-lab/ts-entity/compare/v1.2.1...v1.3.1) (2019-11-21)


### Features

* add `.toJson()` method on Entity ([b1ad1ba](https://github.com/insurgent-lab/ts-entity/commit/b1ad1bacc72fa51571d7c86106e86aaceec97499))

# [1.2.1](https://github.com/insurgent-lab/ts-entity/compare/v1.2.0...v1.2.1) (2019-11-21)


### Bug Fixes

* forgot to export Type ([0bea528](https://github.com/insurgent-lab/ts-entity/commit/0bea528828fcca8ef75ef1961d3392e6f35aac0e))

# [1.2.0](https://github.com/insurgent-lab/ts-entity/compare/v1.1.0...v1.2.0) (2019-11-21)


### Features

* add Object support to the @Type decorator ([944c420](https://github.com/insurgent-lab/ts-entity/commit/944c42096834b794c350063bed400ed96d5b68f8))

# [1.1.0](https://github.com/insurgent-lab/ts-entity/compare/v1.0.1...v1.1.0) (2019-11-21)


### Features

* add support for empty arrays and name aliasing for primitives ([ef43f76](https://github.com/insurgent-lab/ts-entity/commit/ef43f76218617eb43780f71f6fc5a44de806d378))

# [1.0.1](https://github.com/insurgent-lab/ts-entity/compare/35a268cd9ecb13106c74d7947af728314fbfc574...v1.0.1) (2019-11-21)


### Features

* add @Type decorator ([35a268c](https://github.com/insurgent-lab/ts-entity/commit/35a268cd9ecb13106c74d7947af728314fbfc574))
