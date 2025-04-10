# 📦 Changelog 
[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic versioning](https://img.shields.io/badge/semantic%20versioning-2.0.0-green.svg)](https://semver.org)
> All notable changes to this project will be documented in this file

## [1.0.99](https://github.com/mmiscool/aiCoder/compare/v1.0.98...v1.0.99) (2025-04-10)

### 🤖 Build System

* Added support for xAI grok ([e11017e](https://github.com/mmiscool/aiCoder/commit/e11017e48a7b256eb9387db15f59b00c8f5f57e2))

## [1.0.98](https://github.com/mmiscool/aiCoder/compare/v1.0.97...v1.0.98) (2025-03-15)

### 🤖 Build System

* Fix bug related to file contents not being added to messages to be passed to LLM ([3f577fc](https://github.com/mmiscool/aiCoder/commit/3f577fc9f483d3b30a06b17fa0b4bdb1a971fbcf))

## [1.0.97](https://github.com/mmiscool/aiCoder/compare/v1.0.96...v1.0.97) (2025-03-08)

### 🤖 Build System

* Fixed broken openAI api call. ([835f32c](https://github.com/mmiscool/aiCoder/commit/835f32c9a009588319f4b955f98aec2ab0d1fdbc))

## [1.0.96](https://github.com/mmiscool/aiCoder/compare/v1.0.95...v1.0.96) (2025-03-05)

### 🤖 Build System

* always display snippet past textarea on tools tab ([c2e99e8](https://github.com/mmiscool/aiCoder/commit/c2e99e89b333caf15e6f34382d63037fbdfbf4c3))
* Fix bug in LLM call code to strip off and restore extra conversation message object atrributes. ([b6b7707](https://github.com/mmiscool/aiCoder/commit/b6b770751b40f408f5cdcc1fcd39a3299e333a4d))
* Fix endless recursion in debugLog function ([42bbe5d](https://github.com/mmiscool/aiCoder/commit/42bbe5d4bf3f69d8e7f4055e57542a80a478dbb9))
* Upgrade openAI api version. ([5dd62a6](https://github.com/mmiscool/aiCoder/commit/5dd62a68aba058f110cb22ff21403c47168e956c))

## [1.0.95](https://github.com/mmiscool/aiCoder/compare/v1.0.94...v1.0.95) (2025-01-29)

### 🤖 Build System

* fixed groq support to work with deepseek-r1 ([1598f19](https://github.com/mmiscool/aiCoder/commit/1598f19384db4affd6fef8bba8dfeca6f095fe1e))

## [1.0.94](https://github.com/mmiscool/aiCoder/compare/v1.0.93...v1.0.94) (2025-01-23)

### 🤖 Build System

* Fixed LLM throttle ([eb8dc73](https://github.com/mmiscool/aiCoder/commit/eb8dc73aa148c440c2af53e209e272bf5fec073e))

## [1.0.93](https://github.com/mmiscool/aiCoder/compare/v1.0.92...v1.0.93) (2025-01-16)

### 🤖 Build System

* Working on making web version that requires no install. ([2dfd4c8](https://github.com/mmiscool/aiCoder/commit/2dfd4c8fd83518b31d60ef39a04f32180b740c76))

## [1.0.92](https://github.com/mmiscool/aiCoder/compare/v1.0.91...v1.0.92) (2025-01-09)

### 🤖 Build System

* Pruning unused code and better error reporting. ([3b939cd](https://github.com/mmiscool/aiCoder/commit/3b939cd0521c6a012fbd4b78453c9f4f392ea141))

## [1.0.91](https://github.com/mmiscool/aiCoder/compare/v1.0.90...v1.0.91) (2025-01-07)

### 🤖 Build System

* tweak css ([4e88d57](https://github.com/mmiscool/aiCoder/commit/4e88d5771699dbca19ff025c39dba85e3f06e064))

## [1.0.90](https://github.com/mmiscool/aiCoder/compare/v1.0.89...v1.0.90) (2025-01-07)

### 📝 Documentation

* trigger cloudflare pages rebuild. ([8f33d48](https://github.com/mmiscool/aiCoder/commit/8f33d489593d7c4ada7f2c15627169d71e0eb237))
* trigger cloudflare website redeployment. ([49c12cc](https://github.com/mmiscool/aiCoder/commit/49c12cc1245a997d735a2c1aae73887b4fc65ea1))

### 🤖 Build System

* added support for LLM editing CSS files. ([60f586f](https://github.com/mmiscool/aiCoder/commit/60f586f179647065e6742b9c8e579bcaa1914820))

## [1.0.89](https://github.com/mmiscool/aiCoder/compare/v1.0.88...v1.0.89) (2025-01-05)

### 📝 Documentation

* Update landing page ([aa3e37e](https://github.com/mmiscool/aiCoder/commit/aa3e37e0363484731a610233c0b20e5366acc07f))

### 🤖 Build System

* Update docs to reference CDN image links to show up in NPM readme. ([0515ad7](https://github.com/mmiscool/aiCoder/commit/0515ad7a0994f480f4e57c9ee32fbb0a15c04eb6))

## [1.0.88](https://github.com/mmiscool/aiCoder/compare/v1.0.87...v1.0.88) (2025-01-04)

### 🤖 Build System

* fix problem with showing plan edit tools in chat related to conversation title. ([bcf345d](https://github.com/mmiscool/aiCoder/commit/bcf345dec7ec8584f671b530b34dc950984d81d3))

## [1.0.87](https://github.com/mmiscool/aiCoder/compare/v1.0.86...v1.0.87) (2025-01-04)

### 🤖 Build System

* fix bug in auto generating conversation title. ([6f4ceb6](https://github.com/mmiscool/aiCoder/commit/6f4ceb6bb898597e0c20fc18f48d9f2b2fa74828))

## [1.0.86](https://github.com/mmiscool/aiCoder/compare/v1.0.85...v1.0.86) (2025-01-04)

### 🤖 Build System

* disable automatic title generation. ([c7a4b54](https://github.com/mmiscool/aiCoder/commit/c7a4b5433b4d7b7d511874e9554df347089744a1))

## [1.0.85](https://github.com/mmiscool/aiCoder/compare/v1.0.84...v1.0.85) (2025-01-04)

### 🤖 Build System

* fix bug in conversation title not saving correctly and blanking conversation. ([c6ac1ad](https://github.com/mmiscool/aiCoder/commit/c6ac1adadc2b5dfe9d3fdce6da2dd07931042494))

## [1.0.84](https://github.com/mmiscool/aiCoder/compare/v1.0.83...v1.0.84) (2025-01-04)

### 📝 Documentation

* update docs to provide instructions for getting granite3.1-dense model for ollama ([0f5d7aa](https://github.com/mmiscool/aiCoder/commit/0f5d7aaec5ab963838e039903092da2c1a5f1a4c))

### 🤖 Build System

* remove leftover NURBS language from default system prompt. ([20ac3ba](https://github.com/mmiscool/aiCoder/commit/20ac3ba134f20f544a315e2f5f7f87e8f1db2822))

## [1.0.83](https://github.com/mmiscool/aiCoder/compare/v1.0.82...v1.0.83) (2025-01-04)

### 📝 Documentation

* embedded merging demo in to landing page. ([409cf50](https://github.com/mmiscool/aiCoder/commit/409cf50aa7d3c03544134a3b9494a691b9c129e9))
* update site to be nicer ([d254d31](https://github.com/mmiscool/aiCoder/commit/d254d31baf9aa8fb57d5e19885d8edc351f6d5e5))

### 🤖 Build System

* Made refreshing the page stay on the current tab. ([5d1d484](https://github.com/mmiscool/aiCoder/commit/5d1d48419724d61a0771af539d4ebdc314af13ee))

## [1.0.82](https://github.com/mmiscool/aiCoder/compare/v1.0.81...v1.0.82) (2025-01-04)

### 🤖 Build System

* working on merging code. ([8c2e217](https://github.com/mmiscool/aiCoder/commit/8c2e217c63afda2c6b624a807bf9d460574ac48b))

## [1.0.81](https://github.com/mmiscool/aiCoder/compare/v1.0.80...v1.0.81) (2025-01-04)

### 🤖 Build System

* fixed bug in AST manipulation logic related to nested function definitions. ([2948752](https://github.com/mmiscool/aiCoder/commit/2948752eac14e42390e105d9e52f189fc68b428d))

## [1.0.80](https://github.com/mmiscool/aiCoder/compare/v1.0.79...v1.0.80) (2025-01-04)

### 🤖 Build System

* fixed bug in fileIO. ([9b79393](https://github.com/mmiscool/aiCoder/commit/9b79393c1cd1ab70199cafd6a1abd3f1caa08e95))

## [1.0.79](https://github.com/mmiscool/aiCoder/compare/v1.0.78...v1.0.79) (2025-01-04)

### 🤖 Build System

* added fav icon. ([de1151d](https://github.com/mmiscool/aiCoder/commit/de1151de62fdb5df5f5a79bb3b1932a09d9baeb0))

## [1.0.78](https://github.com/mmiscool/aiCoder/compare/v1.0.77...v1.0.78) (2025-01-04)

### 🤖 Build System

* Fixed bug in merging code ([79050d9](https://github.com/mmiscool/aiCoder/commit/79050d97bdd3dbb797f26747b4238ed7ec43283d))

## [1.0.77](https://github.com/mmiscool/aiCoder/compare/v1.0.76...v1.0.77) (2025-01-02)

### 📝 Documentation

* make landing page a little bit more pretty ([e86ee11](https://github.com/mmiscool/aiCoder/commit/e86ee11de7598e93650d65c4a94e7eed00206cba))
* tweak landing page background ([63e1164](https://github.com/mmiscool/aiCoder/commit/63e116498892a0046c4f9ec48fa01619ffc120e0))

### 🤖 Build System

* updated the colors to handle both light and dark mode. ([fd0e1a6](https://github.com/mmiscool/aiCoder/commit/fd0e1a63cc07eb75ca6119c17505093274517fbd))

## [1.0.76](https://github.com/mmiscool/aiCoder/compare/v1.0.75...v1.0.76) (2025-01-02)

### 📝 Documentation

* add meta tags to landing page for SEO ([d96a94d](https://github.com/mmiscool/aiCoder/commit/d96a94de59b5c50d97036d4ad149adc834e99d25))

### 🤖 Build System

* fix bug with the codeManipulator not correctly merging functions ([2681d49](https://github.com/mmiscool/aiCoder/commit/2681d4938a988ac20911f15190002028ebbfdebb))

## [1.0.75](https://github.com/mmiscool/aiCoder/compare/v1.0.74...v1.0.75) (2025-01-02)

### 🤖 Build System

* failback to regular rex if markdown fails to render ([6f45968](https://github.com/mmiscool/aiCoder/commit/6f4596893fbab90097594e8dfb1e5171cca5f7d6))
* update landing page to be nice on mobile. ([3d7f373](https://github.com/mmiscool/aiCoder/commit/3d7f373ef204ef781422ef87affc0d94b3aeac4f))

## [1.0.74](https://github.com/mmiscool/aiCoder/compare/v1.0.73...v1.0.74) (2025-01-01)

### 🤖 Build System

* cleanup un-needed debugging messages. ([23659c9](https://github.com/mmiscool/aiCoder/commit/23659c93c7d9b4a4f4c7b857cd327c7a0f937247))

## [1.0.73](https://github.com/mmiscool/aiCoder/compare/v1.0.72...v1.0.73) (2025-01-01)

### 📝 Documentation

* add AST merge images to landing page ([1d776cc](https://github.com/mmiscool/aiCoder/commit/1d776ccaa50218a88c7705c4e3e71161d85b7096))
* landing page updates ([cbf4f68](https://github.com/mmiscool/aiCoder/commit/cbf4f6871a2fbc2447f5d148385ffac563532b89))
* Make the landing page better looking ([b25870c](https://github.com/mmiscool/aiCoder/commit/b25870cd61844c5322602e80fcb2a92f947f5929))

### 🤖 Build System

* Made it start on the next available port if 3000 is already in use. ([0141bba](https://github.com/mmiscool/aiCoder/commit/0141bba7a20f464e156eddf3caa828a1c2e117c1))

## [1.0.72](https://github.com/mmiscool/aiCoder/compare/v1.0.71...v1.0.72) (2025-01-01)

### 🤖 Build System

* possibly make work on windows. ([3c3dbb0](https://github.com/mmiscool/aiCoder/commit/3c3dbb0e1222b757c32904b22e174e4e90a53bbd))

## [1.0.71](https://github.com/mmiscool/aiCoder/compare/v1.0.70...v1.0.71) (2025-01-01)

### 🤖 Build System

* fixing package to work with npx for windows ([4eef3c8](https://github.com/mmiscool/aiCoder/commit/4eef3c8378daaaa6b8902a7112041022cc408fb3))

## [1.0.70](https://github.com/mmiscool/aiCoder/compare/v1.0.69...v1.0.70) (2025-01-01)

### 🤖 Build System

* fix to make aiCoder run on windows. ([02135dc](https://github.com/mmiscool/aiCoder/commit/02135dc13d731f0c37ed59dfa6d79d1832465355))

## [1.0.69](https://github.com/mmiscool/aiCoder/compare/v1.0.68...v1.0.69) (2025-01-01)

### 📝 Documentation

* added landing page ([8283726](https://github.com/mmiscool/aiCoder/commit/82837262eede7da61c6b93e5baa0e9ab12de51f0))
* landing page tweaks ([b2322d9](https://github.com/mmiscool/aiCoder/commit/b2322d94070e392893661b985ccaf33074eb88de))
* landing page tweaks ([a6ebd0f](https://github.com/mmiscool/aiCoder/commit/a6ebd0f054a72224f6c0cb6ef72ab6e2e3229a85))
* Reduce gif image size ([1910623](https://github.com/mmiscool/aiCoder/commit/19106238303aead196b772e4fde70406191044a2))
* setting up github pages ([3cedc15](https://github.com/mmiscool/aiCoder/commit/3cedc155d0b9689629c685f0346ca080e4aab762))
* spelling on landing page. ([2c510b8](https://github.com/mmiscool/aiCoder/commit/2c510b80df04b6e91ef75411086dd489ae0e9cb4))
* tweaking landing page ([89ae2d3](https://github.com/mmiscool/aiCoder/commit/89ae2d38bd5dce9bed13220a51d0591979fe89d9))
* Tweaks to landing page ([c0dbe61](https://github.com/mmiscool/aiCoder/commit/c0dbe61f54d95147d2868b25d65d588610df1878))
* tweaks to site landing page ([ae8b48b](https://github.com/mmiscool/aiCoder/commit/ae8b48b53c94e2acd704f6496066eca0704eabc2))

### 🤖 Build System

* Trying to make aicoder work with npx ([2ba17aa](https://github.com/mmiscool/aiCoder/commit/2ba17aa31da9856db983bf4d3aecf36404367842))

## [1.0.68](https://github.com/mmiscool/aiCoder/compare/v1.0.67...v1.0.68) (2024-12-31)

### 📝 Documentation

* reduce docs image sizes. ([c2de621](https://github.com/mmiscool/aiCoder/commit/c2de62133c1f75ddc8c898bda5ff29ce8ca0f4a5))
* tweaks ([d9fe9a7](https://github.com/mmiscool/aiCoder/commit/d9fe9a7d2651cd06a0fb380dd4f35decaaf9fc27))

### 🤖 Build System

* possibly make work using npx ([5d64fc7](https://github.com/mmiscool/aiCoder/commit/5d64fc768fd92ef0af9e86295000c40ed8281492))

## [1.0.67](https://github.com/mmiscool/aiCoder/compare/v1.0.66...v1.0.67) (2024-12-31)

### 📝 Documentation

* Updated readme. ([36747f0](https://github.com/mmiscool/aiCoder/commit/36747f0db73abca41bf54c583ea08c70793bd821))

### 🤖 Build System

* remove bad import. ([5b53a65](https://github.com/mmiscool/aiCoder/commit/5b53a656683df5caedee263073bef51bf8b0da4e))

## [1.0.66](https://github.com/mmiscool/aiCoder/compare/v1.0.65...v1.0.66) (2024-12-31)

### 🤖 Build System

* added gemini LLM support. ([9b1a9df](https://github.com/mmiscool/aiCoder/commit/9b1a9df9c2616ef19022ff100737eacec743c213))

## [1.0.65](https://github.com/mmiscool/aiCoder/compare/v1.0.64...v1.0.65) (2024-12-28)

### 🤖 Build System

* prevent replacement of unicode characters ([e2e926d](https://github.com/mmiscool/aiCoder/commit/e2e926d02ceefad47c962de668f0cc614077a659))

## [1.0.64](https://github.com/mmiscool/aiCoder/compare/v1.0.63...v1.0.64) (2024-12-26)

### 📝 Documentation

* update README.md ([647ec1b](https://github.com/mmiscool/aiCoder/commit/647ec1be5378e059ce524845f4a32735db7521ea))

### 🤖 Build System

* added more custom prompts to default list. ([edd2912](https://github.com/mmiscool/aiCoder/commit/edd2912a362e653a7cecc3afa177b68bc8605c86))
* Added more premade prompts. CLeanup docs. ([c20895b](https://github.com/mmiscool/aiCoder/commit/c20895b7b6d1e92514431cc0a82f0ba4f521cb44))

## [1.0.63](https://github.com/mmiscool/aiCoder/compare/v1.0.62...v1.0.63) (2024-12-22)

### 🤖 Build System

* Prevent no file selected error on plan chats. ([ecd0a7d](https://github.com/mmiscool/aiCoder/commit/ecd0a7db7450a575fced9f21dd8427b9c6996029))

## [1.0.62](https://github.com/mmiscool/aiCoder/compare/v1.0.61...v1.0.62) (2024-12-22)

### 🤖 Build System

* added a little razzle dazzle. ([fa7215b](https://github.com/mmiscool/aiCoder/commit/fa7215b968b504203e43c338853d3fd4ba091588))

## [1.0.61](https://github.com/mmiscool/aiCoder/compare/v1.0.60...v1.0.61) (2024-12-20)

### 🤖 Build System

* improve local llm setup script. ([4b0e981](https://github.com/mmiscool/aiCoder/commit/4b0e9812716d9780ab9e022c9c5162bb862b8863))

## [1.0.60](https://github.com/mmiscool/aiCoder/compare/v1.0.59...v1.0.60) (2024-12-20)

### 🤖 Build System

* cleanup and improve merging. ([db128e7](https://github.com/mmiscool/aiCoder/commit/db128e75380cced99562ffc7d0654a4a7a66938d))

## [1.0.59](https://github.com/mmiscool/aiCoder/compare/v1.0.58...v1.0.59) (2024-12-19)

### 🤖 Build System

* make web sockets work behind reverse proxy not at root. ([5935375](https://github.com/mmiscool/aiCoder/commit/5935375739617f851152a8a51e7df6c2484009ba))

## [1.0.58](https://github.com/mmiscool/aiCoder/compare/v1.0.57...v1.0.58) (2024-12-19)

### 🤖 Build System

* Added import statement merger. ([bd113b1](https://github.com/mmiscool/aiCoder/commit/bd113b1cff71249c949a1ff730e78f46c008e517))

## [1.0.57](https://github.com/mmiscool/aiCoder/compare/v1.0.56...v1.0.57) (2024-12-19)

### 🤖 Build System

* New AST merge logic. ([6c54e8e](https://github.com/mmiscool/aiCoder/commit/6c54e8e7d9878834b2ef54e0395586d1719492b3))

## [1.0.56](https://github.com/mmiscool/aiCoder/compare/v1.0.55...v1.0.56) (2024-12-18)

### 🤖 Build System

* ui tweaks ([e8cdf77](https://github.com/mmiscool/aiCoder/commit/e8cdf7715ba1e8eca92177cbe271bc7ac01c896c))

## [1.0.55](https://github.com/mmiscool/aiCoder/compare/v1.0.54...v1.0.55) (2024-12-17)

### 🤖 Build System

* added treeview widget ([704e9c9](https://github.com/mmiscool/aiCoder/commit/704e9c946b1b1ad7b685775ab45c7d9ab94b9066))

## [1.0.54](https://github.com/mmiscool/aiCoder/compare/v1.0.53...v1.0.54) (2024-12-16)

### 🤖 Build System

* Lots of UI tweaks and some default prompt changes. ([1f5a543](https://github.com/mmiscool/aiCoder/commit/1f5a543e27a7854f9d031ee84aa1e9d653986e53))

## [1.0.53](https://github.com/mmiscool/aiCoder/compare/v1.0.52...v1.0.53) (2024-12-15)

### 🤖 Build System

* Made web sockets work for both http and https. ([0149c63](https://github.com/mmiscool/aiCoder/commit/0149c634dc6be5cfcc37dabf963b4502e8522293))

## [1.0.52](https://github.com/mmiscool/aiCoder/compare/v1.0.51...v1.0.52) (2024-12-15)

### 🤖 Build System

* remove junk code. ([09ca301](https://github.com/mmiscool/aiCoder/commit/09ca301f37cb12eb43f124de28c7f853ccdaf5a1))

## [1.0.51](https://github.com/mmiscool/aiCoder/compare/v1.0.50...v1.0.51) (2024-12-15)

### 🤖 Build System

* Fix bug causing frontend to not build correctly. ([36d5eec](https://github.com/mmiscool/aiCoder/commit/36d5eec370d8b50d8e461148ac81a6681149928a))

## [1.0.50](https://github.com/mmiscool/aiCoder/compare/v1.0.49...v1.0.50) (2024-12-15)

### 🤖 Build System

* added build step for frontend ([4af8699](https://github.com/mmiscool/aiCoder/commit/4af86991e5640874bc1f933dd0f9ef66793d9bca))
* cleanup lingering unreachable code. ([bdb5924](https://github.com/mmiscool/aiCoder/commit/bdb59244512a751c17692d02e681dea987ea266a))

## [1.0.49](https://github.com/mmiscool/aiCoder/compare/v1.0.48...v1.0.49) (2024-12-14)

### 🤖 Build System

* cleanup of dead code ([36531b3](https://github.com/mmiscool/aiCoder/commit/36531b3cba77148c14ac439d1df2b1b7156aba00))

## [1.0.48](https://github.com/mmiscool/aiCoder/compare/v1.0.47...v1.0.48) (2024-12-14)

### 🤖 Build System

* Use '@mmiscool/scrape_to_markdown' for scraping html to markdown. ([8e9b4a9](https://github.com/mmiscool/aiCoder/commit/8e9b4a911fcb08ce411bcf3af3f97234e04af8b6))

## [1.0.47](https://github.com/mmiscool/aiCoder/compare/v1.0.46...v1.0.47) (2024-12-14)

### 🤖 Build System

* Make default editor configurable. Defaults to VS code. ([dd3cf38](https://github.com/mmiscool/aiCoder/commit/dd3cf38382a0028a0f8400525e8a5c8dfe49581a))

## [1.0.46](https://github.com/mmiscool/aiCoder/compare/v1.0.45...v1.0.46) (2024-12-13)

### 🤖 Build System

* Refactor settings storage. ([1877d19](https://github.com/mmiscool/aiCoder/commit/1877d19ede91c74462394b2a8c025f3f70640a99))

## [1.0.45](https://github.com/mmiscool/aiCoder/compare/v1.0.44...v1.0.45) (2024-12-12)

### 🤖 Build System

* added function list button to tools tab. ([8f458f0](https://github.com/mmiscool/aiCoder/commit/8f458f0453d003b378a4ebbfcc8bae91cce48d81))

## [1.0.44](https://github.com/mmiscool/aiCoder/compare/v1.0.43...v1.0.44) (2024-12-12)

### 🤖 Build System

* Fixed problem where exported classes were not showing in methods list. ([3b76afa](https://github.com/mmiscool/aiCoder/commit/3b76afadb17e57748d0e412f212b35d07d19dbf9))

## [1.0.43](https://github.com/mmiscool/aiCoder/compare/v1.0.42...v1.0.43) (2024-12-12)

### 🤖 Build System

* cleanup alerts in frontend. Added URL downloader to markdown for conversations. ([60a47cc](https://github.com/mmiscool/aiCoder/commit/60a47cc0f3014c6d56913985dc4fe648c8af6941))

## [1.0.42](https://github.com/mmiscool/aiCoder/compare/v1.0.41...v1.0.42) (2024-12-11)

### 🤖 Build System

* Prevent setting screen from not working if ollama is not installed ([343f133](https://github.com/mmiscool/aiCoder/commit/343f1334532af18da2f4613dc149fc89c9f6c4a5))

## [1.0.41](https://github.com/mmiscool/aiCoder/compare/v1.0.40...v1.0.41) (2024-12-11)

### 🤖 Build System

* changed default port number and added argument to start on custom port. ([7a0385f](https://github.com/mmiscool/aiCoder/commit/7a0385f0c6c535b761bcaf375b01ea33cc101448))

## [1.0.40](https://github.com/mmiscool/aiCoder/compare/v1.0.39...v1.0.40) (2024-12-10)

### 🤖 Build System

* added icons to UI tabs. ([2d5cc46](https://github.com/mmiscool/aiCoder/commit/2d5cc4620b7e59ebf2265bb14a8bc441ad1bc4b0))

## [1.0.39](https://github.com/mmiscool/aiCoder/compare/v1.0.38...v1.0.39) (2024-12-10)

### 🤖 Build System

* UI improvements and replacing files tab with fileDialog ([e6fd2c8](https://github.com/mmiscool/aiCoder/commit/e6fd2c87cf4ec3cf5f1014102b9dc42e398f0f95))

## [1.0.38](https://github.com/mmiscool/aiCoder/compare/v1.0.37...v1.0.38) (2024-12-10)

### 🤖 Build System

* Added snippet merge fail detection and automatic request of corrected snippets. ([a783fec](https://github.com/mmiscool/aiCoder/commit/a783fec49fda30d813f201a76e08483c6b1e6e31))

## [1.0.37](https://github.com/mmiscool/aiCoder/compare/v1.0.36...v1.0.37) (2024-12-10)

### 🤖 Build System

* UI tweaks and better custom prompt management ([a5e137e](https://github.com/mmiscool/aiCoder/commit/a5e137e3e01305477e9ebae8c206092ec3c1cd84))

## [1.0.36](https://github.com/mmiscool/aiCoder/compare/v1.0.35...v1.0.36) (2024-12-09)

### 🤖 Build System

* added syntax checking to snippets prior to merge. ([2ad683e](https://github.com/mmiscool/aiCoder/commit/2ad683ef8456f2ef09eed9e5da513fabc6ec5d5e))

## [1.0.35](https://github.com/mmiscool/aiCoder/compare/v1.0.34...v1.0.35) (2024-12-09)

### 🤖 Build System

* UI tweaks. ([6cb81eb](https://github.com/mmiscool/aiCoder/commit/6cb81eb44724c8871a485c46034401cca3825874))

## [1.0.34](https://github.com/mmiscool/aiCoder/compare/v1.0.33...v1.0.34) (2024-12-09)

### 🤖 Build System

* UI tweak ([43e0eaf](https://github.com/mmiscool/aiCoder/commit/43e0eafa6a4ca8b95bf391c3dee5c4f96a02f14e))

## [1.0.33](https://github.com/mmiscool/aiCoder/compare/v1.0.32...v1.0.33) (2024-12-08)

### 🤖 Build System

* add verification checks to for target file ([5bf9761](https://github.com/mmiscool/aiCoder/commit/5bf9761db0c278b90d4dd9b53ad8abd09e32aff8))

## [1.0.32](https://github.com/mmiscool/aiCoder/compare/v1.0.31...v1.0.32) (2024-12-08)

### 🤖 Build System

* Added default custom prompts. ([21751cd](https://github.com/mmiscool/aiCoder/commit/21751cd37e0ee7fda7345f845af3358e5dae3840))

## [1.0.31](https://github.com/mmiscool/aiCoder/compare/v1.0.30...v1.0.31) (2024-12-08)

### 🤖 Build System

* added ability to store reusable prompts. ([5177767](https://github.com/mmiscool/aiCoder/commit/5177767e0834481eb418fb8999842850a6996f10))

## [1.0.30](https://github.com/mmiscool/aiCoder/compare/v1.0.29...v1.0.30) (2024-12-08)

### 🤖 Build System

* remove unused packages. Clean up debugging console logs. ([f01e289](https://github.com/mmiscool/aiCoder/commit/f01e2896d986666fd711bce5581004b1fa0f73b0))

## [1.0.29](https://github.com/mmiscool/aiCoder/compare/v1.0.28...v1.0.29) (2024-12-08)

### 🤖 Build System

* update docs ([1113af6](https://github.com/mmiscool/aiCoder/commit/1113af6b0408589cc964be8cee91c822a05cb73d))

## [1.0.28](https://github.com/mmiscool/aiCoder/compare/v1.0.27...v1.0.28) (2024-12-07)

### 🤖 Build System

* fix problem with merge code ([08d4921](https://github.com/mmiscool/aiCoder/commit/08d492130443ff1f9dd5096ab8ed65109dfeedd2))

## [1.0.27](https://github.com/mmiscool/aiCoder/compare/v1.0.26...v1.0.27) (2024-12-07)

### 🤖 Build System

* Updating docs for new UI. ([ceaf8fe](https://github.com/mmiscool/aiCoder/commit/ceaf8feb2d46b3c452aa1916cda9f4fc275ee2ed))

## [1.0.26](https://github.com/mmiscool/aiCoder/compare/v1.0.25...v1.0.26) (2024-12-07)

### 🤖 Build System

* improve interface style ([5aafb80](https://github.com/mmiscool/aiCoder/commit/5aafb80938ddd381bb852f26ecbe15b38a951c0f))

## [1.0.25](https://github.com/mmiscool/aiCoder/compare/v1.0.24...v1.0.25) (2024-12-07)

### 🤖 Build System

* added conversation history. Major changes. ([4a6bfae](https://github.com/mmiscool/aiCoder/commit/4a6bfae9664d2f523c4dba3231507c496aaab22b))

## [1.0.24](https://github.com/mmiscool/aiCoder/compare/v1.0.23...v1.0.24) (2024-12-04)

### 🤖 Build System

* Added tools for making edits to the plan using chat better. ([68efbaa](https://github.com/mmiscool/aiCoder/commit/68efbaa623734330b3dbff7b410ec5e786d3aa55))

## [1.0.23](https://github.com/mmiscool/aiCoder/compare/v1.0.22...v1.0.23) (2024-12-03)

### 🤖 Build System

* Swap to esprima-next package to support spread operator. ([9dc3eec](https://github.com/mmiscool/aiCoder/commit/9dc3eec5c25556961c7008888c9ff3d6be6087f7))

## [1.0.22](https://github.com/mmiscool/aiCoder/compare/v1.0.21...v1.0.22) (2024-12-02)

### 🤖 Build System

* added file manager ([cb93b26](https://github.com/mmiscool/aiCoder/commit/cb93b26e6bf1496cf898405c393500b6466e8d8b))

## [1.0.21](https://github.com/mmiscool/aiCoder/compare/v1.0.20...v1.0.21) (2024-12-02)

### 🤖 Build System

* Fix broken build. Added support for Anthropic ([27be782](https://github.com/mmiscool/aiCoder/commit/27be782e33a04ad049536189c1d7b1def2da334d))

## [1.0.20](https://github.com/mmiscool/aiCoder/compare/v1.0.19...v1.0.20) (2024-12-02)

### 🤖 Build System

* Added support for Anthropic ([5676cf0](https://github.com/mmiscool/aiCoder/commit/5676cf01529ab6245c6b1a302da8f45a18e4c9ce))

## [1.0.19](https://github.com/mmiscool/aiCoder/compare/v1.0.18...v1.0.19) (2024-12-01)

### 🤖 Build System

* tweak to default prompt when selecting method from tools tab. ([e39bad2](https://github.com/mmiscool/aiCoder/commit/e39bad2458535fba3d7fb9f83183780c0a867efb))

## [1.0.18](https://github.com/mmiscool/aiCoder/compare/v1.0.17...v1.0.18) (2024-12-01)

### 🤖 Build System

* fix default prompt ([a315f07](https://github.com/mmiscool/aiCoder/commit/a315f07d8fe67a95cbd8d30dde2414751c2543d8))

## [1.0.17](https://github.com/mmiscool/aiCoder/compare/v1.0.16...v1.0.17) (2024-12-01)

### 🤖 Build System

* make auto apply code buttons justify right. ([ba69426](https://github.com/mmiscool/aiCoder/commit/ba6942678e0eac1b33378e454248c883b0a52600))

## [1.0.16](https://github.com/mmiscool/aiCoder/compare/v1.0.15...v1.0.16) (2024-11-30)

### 🤖 Build System

* refactoring and added new UI docs ([b7f3431](https://github.com/mmiscool/aiCoder/commit/b7f34319ae94f660ffc360cade757dfce1aef841))

## [1.0.15](https://github.com/mmiscool/aiCoder/compare/v1.0.14...v1.0.15) (2024-11-30)

### 🤖 Build System

* latest and greatest. ([7d95ea8](https://github.com/mmiscool/aiCoder/commit/7d95ea84e124318acf9597c6025ef878d3bdc4cd))

## [1.0.14](https://github.com/mmiscool/aiCoder/compare/v1.0.13...v1.0.14) (2024-11-30)

### 🤖 Build System

* Refactor new webUI ([7bf25f7](https://github.com/mmiscool/aiCoder/commit/7bf25f79c53502b51d7efbd2ccf5cdc6063b49cb))

## [1.0.13](https://github.com/mmiscool/aiCoder/compare/v1.0.12...v1.0.13) (2024-11-30)

### 🤖 Build System

* More changes to support webUI. ([b64ea06](https://github.com/mmiscool/aiCoder/commit/b64ea06118960f26de8e328bd00a3ace76998fe5))

## [1.0.12](https://github.com/mmiscool/aiCoder/compare/v1.0.11...v1.0.12) (2024-11-29)

### 🤖 Build System

* Fleshing out the web UI ([26b6d1d](https://github.com/mmiscool/aiCoder/commit/26b6d1d1a85b0ebfca16948b6b3704cc258b4677))

## [1.0.11](https://github.com/mmiscool/aiCoder/compare/v1.0.10...v1.0.11) (2024-11-25)

### 🤖 Build System

* Allow for selection of stub methods and automatically generate the method. ([faa2d15](https://github.com/mmiscool/aiCoder/commit/faa2d15171b87efb0725a0846df86aa8c28001e0))

## [1.0.10](https://github.com/mmiscool/aiCoder/compare/v1.0.9...v1.0.10) (2024-11-19)

### 🤖 Build System

* Triggering npm package build ([d57f4b8](https://github.com/mmiscool/aiCoder/commit/d57f4b8a93802c46ed2a9547f863d08286d7a5e8))

## [1.0.9](https://github.com/mmiscool/aiCoder/compare/v1.0.8...v1.0.9) (2024-11-12)

### 🤖 Build System

* Major refactor of tool ([de6ded4](https://github.com/mmiscool/aiCoder/commit/de6ded47b71fae9fc45576312e319fb6961b5338))

## [1.0.8](https://github.com/mmiscool/aiCoder/compare/v1.0.7...v1.0.8) (2024-11-10)

### 🤖 Build System

* Cleanup NPM automatic deployment tooling ([6996d92](https://github.com/mmiscool/aiCoder/commit/6996d927b0658640e194b908123726428fc0b152))

## [1.0.7](https://github.com/mmiscool/aiCoder/compare/v1.0.6...v1.0.7) (2024-11-09)

### 🤖 Build System

* Add homepage link to package.json ([40003f6](https://github.com/mmiscool/aiCoder/commit/40003f658b69c3f95d8fa3c1810c9a0d273e4a91))

## [1.0.6](https://github.com/mmiscool/aiCoder/compare/v1.0.5...v1.0.6) (2024-11-09)

### 🤖 Build System

* Add npm package install instructions to README ([0f16ddb](https://github.com/mmiscool/aiCoder/commit/0f16ddb71dc7f6f84064f1300be4424acf294e96))

## [1.0.5](https://github.com/mmiscool/aiCoder/compare/v1.0.4...v1.0.5) (2024-11-09)

### 🤖 Build System

* CHange package name to make NPM happy ([334ec0b](https://github.com/mmiscool/aiCoder/commit/334ec0bc0f64caec3e7d306ebe18d7421decd766))

## [1.0.4](https://github.com/mmiscool/aiCoder/compare/v1.0.3...v1.0.4) (2024-11-09)

### 🤖 Build System

* mabe npm deploy ([73f26f5](https://github.com/mmiscool/aiCoder/commit/73f26f570b5d323597a2f66674a3ce581d19e6a3))

## [1.0.3](https://github.com/mmiscool/aiCoder/compare/v1.0.2...v1.0.3) (2024-11-09)

### 🤖 Build System

* change package name ([b37c862](https://github.com/mmiscool/aiCoder/commit/b37c86245de506b23cd43c82f6ddb34b1fa221d0))

## [1.0.2](https://github.com/mmiscool/aiCoder/compare/v1.0.1...v1.0.2) (2024-11-09)

### 🤖 Build System

* I wonder if we will now have an NPM package ([545acae](https://github.com/mmiscool/aiCoder/commit/545acaea69906183c3f4cc679721a16aee49122f))

## [1.0.1](https://github.com/mmiscool/aiCoder/compare/v1.0.0...v1.0.1) (2024-11-09)

### 🤖 Build System

* ANOYING npm PACKAGE THING ([0faf1e4](https://github.com/mmiscool/aiCoder/commit/0faf1e4e61fc0533ef9894d649cf9c3d95b57951))

## 1.0.0 (2024-11-09)

### 🤖 Build System

* HOPEFULLY MAKE NPM PACKAGE ([539db1c](https://github.com/mmiscool/aiCoder/commit/539db1cb0f0c845f5c86c1bf5ec6ab33c6819cd0))
