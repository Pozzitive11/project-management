
1. **Додати (або розкоментувати) новий тип шаблонів в Enum + додати моделі для нового шаблону**
   - Відкрити файл `features/discounts/models/dc-template-models/dct-types.enum.ts`.
   - Додати новий запис до переліку `dctTypesShortEnum`. Ключ повинен бути назвою нового типу шаблону у верхньому регістрі, а значення - назвою вихідного документу.
     Додати новий запис з назвою енд-поінту до Map `dctBuildEndPointsMap`

       ```typescript
       export enum dctTypesShortEnum {
         // existing types...
         NEW_TEMPLATE_TYPE = 'Новий тип шаблону',
       }
       export const dctBuildEndPointsMap = new Map<dctTypesShortValues, string>([
         [dctTypesShortEnum.ASSIGNMENT_LETTER, 'build_inform_letter_template'],
         // ...
         [dctTypesShortEnum.NEW_TEMPLATE_TYPE, 'new_template_type_template'],
       ])
       ```

   - Додати нові моделі для нового шаблону в `src/app/features/discounts/models/dc-template-models`.
   - Назви моделей:
     - Формат `dct-{new-template-type}-input-data.model.ts` - модель даних, що відправляється для отримання даних для нового шаблону.
     - Формат `dct-{new-template-type}-data.model.ts` - модель даних, що отримується з сервера для нового шаблону. Ця модель повинна імплементувати інтерфейс `DctBaseModel`.

   - Оновити тип `DctDataType`(додати новий запис для нового типу шаблону):

       ```typescript
       export type DctDataType = DctWritingOffDataModel /* ... */ | DctNewTemplateTypeDataModel;
       ```

2. **Створити новий сервіс для нового типу шаблону**
   - Створити новий файл сервісу в директорії `features/discounts/services/templates`. Сервіс повинен мати назву у форматі `dc-template-{new-template-type}.service.ts`.
   - Новий сервіс повинен мати схожі методи з тими, що існують в інших сервісах шаблонів (`DcTemplateInformLetterService`, `DcTemplateWritingOffContractService`, `DctGuaranteeLetterService`),
   такі як `create[TemplateType]Templates`, `fill[TemplateType]TemplatesData`, `build[TemplateType]Template`, `save[TemplateType]Templates` та `delete[TemplateType]Template`.
   - Призначення методів:
     - `create[NewTemplateType]Templates` - створює початкові шаблони для нового типу шаблону (створює об'єкти `Dct[NewTemplateType]InputDataModel`) (за потреби).
     - `fill[NewTemplateType]TemplatesData` - заповнює шаблони даними з сервера (заповнює об'єкти `Dct[NewTemplateType]DataModel`).
     - `build[NewTemplateType]Template` - відправляє запит на сервер для генерації файлу документа.
     - `save[NewTemplateType]Templates` - відправляє запит для збереження згенерованих шаблонів на сервері.
     - `deleteTemplate` - видаляє шаблон зі списку шаблонів (видаляє об'єкт зі списку об'єктів `Dct[NewTemplateType]DataModel` та `Dct[NewTemplateType]InputDataModel`).

3. **Оновити сервіс `DcTemplatesService`**
   - Inject новий сервіс в `DcTemplatesService`:

     ```typescript
     private readonly newTemplateService = inject(DcTemplateNewTypeService)
     ```

   - Додати новий `computed` signal для отримання інформації щодо підтвердження створення шаблонів нового типу `newTemplateTypeConfirmed`:

     ```typescript
      readonly isConfirmNewTemplateType = computed(() => {
        return this.templatesList()
         .filter(data => data.templateType === dctTypesShortEnum.NEW_TEMPLATE_TYPE)
         .every(data => data.confirmed)
      });
     ```
   - Додати до `combineLatest` в `loading$` loading$ з нового сервісу:

     ```typescript
     loading$ = combineLatest([
       this.itemLoadingFinished$,
       // ...
       this.newTemplateService.loading$,
     ])
     ```

   - Оновити метод `getTemplatesListToCreate` (додати очищення даних в новому сервісі):

     ```typescript
     getTemplatesListToCreate() {
       // ...
        this.newTemplateService.newTemplateTypeTemplatesData.set([])
     }
     ```

   - Оновити метод `buildTemplates`:

     ```typescript
     buildTemplates() {
       // ...
       // Map для збереження типу шаблону та відповідних signal
       const dataToBuild = new Map<dctTypesShortValues, WritableSignal<DctDataType[]>>([
         // ...
         [dctTypesShortEnum.NEW_TEMPLATE_TYPE, this.newTemplateService.newTemplateTypeTemplatesData],
       ])
     }
     ```

   - Оновити метод `resetConfirmation`:

     ```typescript
     resetConfirmation() {
       // ...
       // this.newTemplateService.inputNewTemplateTypeTemplatesData
       // .update(data => data.map(prom => ({ ...prom, confirmed: false })))  // якщо використовується inputNewTemplateTypeTemplatesData
        this.newTemplateService.newTemplateTypeTemplatesData
          .update(data => data.map(prom => ({ ...prom, confirmed: false })))
     }
     ```

   - Оновити метод `resetTemplates`:

     ```typescript
     resetTemplates() {
       // ...
       // this.newTemplateService.inputNewTemplateTypeTemplatesData.set([])  // якщо використовується inputNewTemplateTypeTemplatesData
       this.newTemplateService.newTemplateTypeTemplatesData.set([])
       this.navigationService.navigateBack('/discounts/promotions_table/templates')
     }
     ```

4. **Оновити `DcTemplateCreationPageComponent`**
   - Відкрити файл `dc-template-creation-page.component.ts`.
   - Додати новий запис для нового типу шаблону в computed `shownTemplateData`:

     ```typescript
     shownTemplateData = computed(() => {
       // ...
       switch (selectedTemplate.templateType) {
          // ...
          case dctTypesShortEnum.NEW_TEMPLATE_TYPE:
            return this.newTemplateService.newTemplateTypeTemplatesData()
              .filter((data) => data.PromotionId === selectedTemplate.id)[0]
       }
     })
     ```

   - Додати новий запис для нового типу шаблону в `showingElements`:

     ```typescript
       showingElements = {
         // ...
         newTemplateType: true
       }
     ```

   - Оновити computed `someNotConfirmed` (якщо новий тип використовує `currentStep === 1`):

      ```typescript
        someNotConfirmed = computed(() => {
          // ...
          if (this.currentStep === 1)
            return (
              this.writingOffService.inputWritingOffData().some((data) => !data.confirmed) ||
              // ...
              this.newTemplateService.newTemplateTypeTemplatesData().some((data) => !data.confirmed)
            )
        })
      ```

   - Оновити computed `someFilesNotLoaded`:

      ```typescript
        someFilesNotLoaded = computed(() => {
          // ...
          return (
            this.writingOffService.writingOffFailedDocLoads().length > 0 ||
            // ...
            this.newTemplateService.newTemplateTypeTemplatesData().length > 0
          )
        })
      ```

   - Оновити метод `nextStep`. Для різних шаблонів необхідні зміни можуть відрізнятися, тому треба пройтись по методу повністю і внести всі необхідні зміни.

   - Оновити метод `prevStep` (якщо новий тип використовує `currentStep === 1`):

      ```typescript
        prevStep() {
          if (
            this.writingOffService.inputWritingOffData().length === 0
            // ...
            && this.newTemplateService.newTemplateTypeTemplatesData().length === 0
          )
            this.templatesService.currentStep.set(this.currentStep - 1)
        }
      ```

   - Оновити метод `removeTemplate`:

      ```typescript
        removeTemplate() {
          switch (templateType) {
            case dctTypesShortEnum.WRITING_OFF_CONTRACT:
              this.writingOffService.deleteTemplate(id)
              break
            // ...
            case dctTypesShortEnum.NEW_TEMPLATE_TYPE:
              this.newTemplateService.deleteTemplate(id)
              break
         }
       }
      ```

   - Оновити методи `confirmDocument`, `confirmAllDocuments` та `rebuildTemplate` аналогічно до інших типів шаблонів
     (відрізняється в залежності від використання `currentStep === 1`).
     Також необхідно оновити тип `TUpdateFunc`:

     ```typescript
     type TUpdateFunc =
       DctWritingOffDataModel
       | DctInputWritingOffDataModel
       // ...
       | DctNewTemplateTypeDataModel
       // | DctInputNewTemplateTypeDataModel // (якщо використовується currentStep === 1)
     ```

5. **Оновити HTML `dc-template-creation-page.component.html`**
   - Відкрити файл `dc-template-creation-page.component.html`.
   - Додати новий `ng-container` для нового типу шаблону. Цей контейнер повинен містити необхідні компоненти та директиви для відображення
   та взаємодії з новим типом шаблону (їх теж необхідно створити в директиві `features/discounts/components/dc-templates` в залежності від даних в новому шаблоні).


-----------------------------------
1. **Selection of Document Types**: The user selects the types of documents they want to create.
   This is done in the `DcTemplateDocumentsPageComponent`. The selected document types are stored in the `selectedDocumentTypes` signal in the `DcTemplatesService`.

2. **Loading Data**: The user triggers the loading of data by clicking a button, which calls the `loadData` method in `DcTemplateDocumentsPageComponent`.
   This method calls the `getClientsPromotionsForTemplates` method in `DcHttpService`, which sends a request to the server to get
   the promotions data for the selected document types.

3. **Creation of Templates**: The `createTemplates` method in `DcTemplatesService` is called.
   This method uses the promotions data to create the initial templates. Depending on the selected document types,
   it calls the `createWritingOffTemplates`, `createInformLetterTemplates`, or `createGuaranteeLetterTemplates` methods in the respective services
   (`DcTemplateWritingOffContractService`, `DcTemplateInformLetterService`, `DctGuaranteeLetterService`).

4. **Filling Templates Data**: The `fillTemplatesData` method in `DcTemplatesService` is called.
   This method fills the templates with data from the server. Depending on the selected document types,
   it calls the `fillTemplatesData` or `fillGuaranteeLetterTemplates` methods in the respective services.

5. **Building Templates**: The `buildTemplates` method in `DcTemplatesService` is called.
   This method builds the templates by sending a request to the server to generate the document files.
   Depending on the selected document types, it calls the `buildTemplate` or `buildGuaranteeLetterTemplate` methods in the respective services.

6. **Downloading Templates**: The `downloadTemplates` method in `DcTemplatesService` is called.
   This method downloads the generated document files from the server.

7. **Saving Templates**: The `saveTemplates` method in `DcTemplatesService` is called.
   This method saves the templates data to the server. Depending on the selected document types,
   it calls the `saveWritingOffTemplates`, `saveInformLetterLetters`, or `saveGuaranteeLetters` methods in the respective services.

8. **Deleting Templates**: The `deleteTemplates` method in `DcTemplatesService` is called.

Throughout this process, several models are used:

- `DctInputWritingOffDataModel`: This model is used to store the initial data for creating writing off templates.
- `DctWritingOffDataModel`: This model is used to store the filled data for writing off templates.
- `DctInformLetterDataModel`: This model is used to store the filled data for inform letter templates.
- `DctGuaranteeLetterInputDataModel`: This model is used to store the initial data for creating guarantee letter templates.
- `DctGuaranteeLetterDataModel`: This model is used to store the filled data for guarantee letter templates.

Each step in this process is reflected in the user interface, allowing the user to control and monitor the progress of the document creation.
