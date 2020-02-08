# [5.0.0](https://github.com/insurgent-lab/ts-entity/compare/v4.2.2...v5.0.0) (2020-02-08)


### Bug Fixes

* revert "feat(TG-1): support for getters ([#8](https://github.com/insurgent-lab/ts-entity/issues/8))" ([#9](https://github.com/insurgent-lab/ts-entity/issues/9)) ([04ffb2e](https://github.com/insurgent-lab/ts-entity/commit/04ffb2eadda4d328367d8aa797bece57aebda0aa))


### BREAKING CHANGES

* reverts support for getters because it added a lot of complexity in types management and also broke type manipulation.

## [4.2.2](https://github.com/insurgent-lab/ts-entity/compare/v4.2.1...v4.2.2) (2020-01-23)


### Bug Fixes

* reflect-metadata as dependency ([bdead7b](https://github.com/insurgent-lab/ts-entity/commit/bdead7b4c7d519e9b7bdad85a5305020c9bf7144))

## [4.2.1](https://github.com/insurgent-lab/ts-entity/compare/v4.2.0...v4.2.1) (2020-01-23)


### Bug Fixes

* added prepublish script ([576e979](https://github.com/insurgent-lab/ts-entity/commit/576e9794c16842e2007357d2836d14bd7264a7c6))

# [4.2.0](https://github.com/insurgent-lab/ts-entity/compare/v4.1.0...v4.2.0) (2020-01-22)


### Features

* **tg-1:** support for getters ([#8](https://github.com/insurgent-lab/ts-entity/issues/8)) ([f8d6b0a](https://github.com/insurgent-lab/ts-entity/commit/f8d6b0adf58375c51f1bdc0b2564127b7d66f395))

# [4.0.0](https://github.com/insurgent-lab/ts-entity/compare/v3.0.0...v4.0.0) (2020-01-22)


### Code Refactoring

* add strictNullChecks & noImplicitAny, remove deferred Type decorator ([#4](https://github.com/insurgent-lab/ts-entity/issues/4)) ([2a2445e](https://github.com/insurgent-lab/ts-entity/commit/2a2445e7955d51ebaecb3e032a5663af99d43941))


### BREAKING CHANGES

* Removed deferred `Type` decorator.
* Enforced `strictNullChecks`.

# [3.0.0](https://github.com/insurgent-lab/ts-entity/compare/v2.0.1...v3.0.0) (2019-11-22)


### Features

* remove the need to initialize properties to `null` ([#2](https://github.com/insurgent-lab/ts-entity/issues/2)) ([8623ff8](https://github.com/insurgent-lab/ts-entity/commit/8623ff8623c881ce068ac02107bbfb4370818332))


### BREAKING CHANGES

* now compatible only for Node v13.2 and above

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
