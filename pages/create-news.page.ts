import { expect, Page } from '@playwright/test';

export class CreateNewsPage {
  constructor(private readonly page: Page) {}

  async expectFormFieldsVisible(): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: /Create news|Створити новину/i })
    ).toBeVisible();

    await expect(
      this.page.locator("textarea[formcontrolname='title']")
    ).toBeVisible();

    await expect(this.page.locator('app-tags-select')).toBeVisible();

    await expect(
      this.page.locator('app-tags-select button').filter({ hasText: /^(News|Новини)$/ })
    ).toBeVisible();

    await expect(
      this.page.locator('app-tags-select button').filter({ hasText: /^(Events|Події)$/ })
    ).toBeVisible();

    await expect(
      this.page.locator('app-tags-select button').filter({ hasText: /^(Education|Освіта)$/ })
    ).toBeVisible();

    await expect(
      this.page.locator('app-tags-select button').filter({ hasText: /^(Initiatives|Ініціативи)$/ })
    ).toBeVisible();

    await expect(
      this.page.locator('app-tags-select button').filter({ hasText: /^(Ads|Реклама)$/ })
    ).toBeVisible();

    await expect(this.page.locator('.image-block')).toBeVisible();

    await expect(
      this.page.locator("input[formcontrolname='source']")
    ).toBeVisible();

    await expect(
      this.page.getByRole('heading', { name: /Content|Зміст/i })
    ).toBeVisible();

    await expect(this.page.locator('.ql-editor')).toBeVisible();

    await expect(this.page.locator('.date')).toContainText(/Date:|Дата:/);
    await expect(this.page.locator('.date')).toContainText(/Author:|Автор:/);
  }

  async expectActionButtonsVisible(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: /^(Cancel|Скасувати|Вийти)$/ }).last()
    ).toBeVisible();

    await expect(
      this.page.getByRole('button', { name: /^(Preview|Переглянути)$/ })
    ).toBeVisible();

    await expect(
      this.page.getByRole('button', { name: /^(Publish|Опублікувати)$/ })
    ).toBeVisible();
  }

  async expectFormFieldsOrder(): Promise<void> {
    const title = this.page.locator("textarea[formcontrolname='title']");
    const tags = this.page.locator('app-tags-select');
    const image = this.page.locator('.image-block');
    const source = this.page.locator("input[formcontrolname='source']");
    const content = this.page.locator('.ql-editor');
    const dateAuthor = this.page.locator('.date');
    const bottomButtons = this.page.locator('.submit-buttons').last();

    const titleBox = await title.boundingBox();
    const tagsBox = await tags.boundingBox();
    const imageBox = await image.boundingBox();
    const sourceBox = await source.boundingBox();
    const contentBox = await content.boundingBox();
    const dateAuthorBox = await dateAuthor.boundingBox();
    const bottomButtonsBox = await bottomButtons.boundingBox();

    if (
      !titleBox ||
      !tagsBox ||
      !imageBox ||
      !sourceBox ||
      !contentBox ||
      !dateAuthorBox ||
      !bottomButtonsBox
    ) {
      throw new Error('Не всі елементи форми знайдені для перевірки порядку');
    }

    expect(titleBox.y).toBeLessThan(tagsBox.y);
    expect(tagsBox.y).toBeLessThan(sourceBox.y);
    expect(sourceBox.y).toBeLessThan(contentBox.y);
    expect(contentBox.y).toBeLessThan(dateAuthorBox.y);

    expect(imageBox.x).toBeGreaterThan(titleBox.x);
    expect(Math.abs(imageBox.y - titleBox.y)).toBeLessThan(80);
    expect(imageBox.y).toBeLessThan(sourceBox.y);

    expect(bottomButtonsBox.y).toBeGreaterThan(dateAuthorBox.y);
  }

  async fillTitle(title: string): Promise<void> {
    await this.page.locator("textarea[formcontrolname='title']").fill(title);
  }

  async clearTitle(): Promise<void> {
    await this.page.locator("textarea[formcontrolname='title']").fill('');
  }

  async expectTitleCounter(counterText: string): Promise<void> {
    await expect(
      this.page.locator('.title-wrapper').getByText(counterText)
    ).toBeVisible();
  }

  async expectTitleInvalid(): Promise<void> {
    await expect(
      this.page.locator("textarea[formcontrolname='title']")
    ).toHaveClass(/ng-invalid/);
  }

  async expectTitleValid(): Promise<void> {
    await expect(
      this.page.locator("textarea[formcontrolname='title']")
    ).toHaveClass(/ng-valid/);
  }

  async fillMainText(text: string): Promise<void> {
    await this.page.locator('.ql-editor').fill(text);
  }

  async expectPublishButtonDisabled(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: /^(Publish|Опублікувати)$/ })
    ).toBeDisabled();
  }

  async expectPublishButtonEnabled(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: /^(Publish|Опублікувати)$/ })
    ).toBeEnabled();
  }

  async selectNewsTag(): Promise<void> {
    await this.selectTag('Новини');
  }

  private getTagButton(tagName: string) {
    const tagNames: Record<string, string> = {
      Новини: 'News',
      Події: 'Events',
      Освіта: 'Education',
      Ініціативи: 'Initiatives',
      Реклама: 'Ads',
    };

    const englishName = tagNames[tagName] || tagName;

    return this.page.locator('app-tags-select button').filter({
      hasText: new RegExp(`^(${tagName}|${englishName})$`),
    });
  }

 async selectTag(tagName: string): Promise<void> {
  await this.getTagButton(tagName).scrollIntoViewIfNeeded();
  await this.getTagButton(tagName).click();

  await this.expectTagIsSelected(tagName);
}
  async expectTagIsSelected(tagName: string): Promise<void> {
    const tagNames: Record<string, string> = {
      Новини: 'News',
      Події: 'Events',
      Освіта: 'Education',
      Ініціативи: 'Initiatives',
      Реклама: 'Ads',
    };

    const englishName = tagNames[tagName] || tagName;

    await expect(
      this.page.locator('app-tags-select a.global-tag-clicked').filter({
        hasText: new RegExp(`^(${tagName}|${englishName})`),
      })
    ).toBeVisible();
  }

  async expectTagIsNotSelected(tagName: string): Promise<void> {
    const tagNames: Record<string, string> = {
      Новини: 'News',
      Події: 'Events',
      Освіта: 'Education',
      Ініціативи: 'Initiatives',
      Реклама: 'Ads',
    };

    const englishName = tagNames[tagName] || tagName;

    await expect(
      this.page.locator('app-tags-select a.global-tag-clicked').filter({
        hasText: new RegExp(`^(${tagName}|${englishName})`),
      })
    ).toHaveCount(0);
  }

  async expectSelectedTagsCount(expectedCount: number): Promise<void> {
    await expect(
      this.page.locator('app-tags-select a.global-tag-clicked')
    ).toHaveCount(expectedCount);
  }

  async clickPublish(): Promise<void> {
    await this.page
      .getByRole('button', { name: /^(Publish|Опублікувати)$/ })
      .click();

    await expect(
      this.page.getByText(
        /Your news has been successfully published|Вашу новину успішно опубліковано/i
      )
    ).toBeVisible({ timeout: 30000 });
  }

  async expectPublishedNewsContainsTitle(title: string): Promise<void> {
    await expect(
      this.page.getByText(title)
    ).toBeVisible({ timeout: 30000 });
  }

  async expectPublishedNewsContainsTag(tagName: string): Promise<void> {
    const tagNames: Record<string, string> = {
      Новини: 'News',
      Події: 'Events',
      Освіта: 'Education',
      Ініціативи: 'Initiatives',
      Реклама: 'Ads',
    };

    const englishName = tagNames[tagName] || tagName;

    await expect(
      this.page.getByText(new RegExp(`(${tagName}|${englishName})`))
    ).toBeVisible({ timeout: 30000 });
  }
  async uploadImage(filePath: string): Promise<void> {
  const fileInput = this.page.locator("input[type='file']").first();

  await fileInput.waitFor({ state: 'attached', timeout: 30000 });
  await fileInput.setInputFiles(filePath);
}



async expectValidImageUploaded(): Promise<void> {
  await expect(
    this.page.locator('.image-block .cropper-block')
  ).toBeVisible({ timeout: 15000 });

  await expect(
    this.page.locator('.image-block image-cropper')
  ).toBeVisible({ timeout: 15000 });
}

async expectImageUploadError(): Promise<void> {
  await expect(
    this.page.getByText(
      /Upload only PNG or JPG\. File size must be less than 10MB|Upload only PNG or JPEG\. File size must be less than 10MB/i
    )
  ).toBeVisible({ timeout: 15000 });
}
async clickApplyImageButton(): Promise<void> {
  await this.page
    .getByRole('button', { name: /^(Submit|Застосувати)$/i })
    .click();
}

async clickCancelImageButton(): Promise<void> {
  await this.page
    .locator('app-drag-and-drop')
    .getByRole('button', { name: /^(Cancel|Скасувати)$/i })
    .click();
}
async clearMainText(): Promise<void> {
  await this.page.locator('.ql-editor').fill('');
}

async expectMainTextErrorVisible(errorText: RegExp): Promise<void> {
  await expect(
    this.page.locator('.textarea-wrapper')
  ).toContainText(errorText, { timeout: 10000 });
}

async expectMainTextErrorNotVisible(): Promise<void> {
  await expect(
    this.page.locator('.textarea-wrapper')
  ).not.toContainText(/Not enough characters|minimum|maximum|maximum character length/i);
}

async expectMainTextCounter(counterText: string): Promise<void> {
  await expect(
    this.page.locator('.quill-counter')
  ).toContainText(counterText);
}

async expectMainTextLength(expectedLength: number): Promise<void> {
  const text = await this.page.locator('.ql-editor').innerText();
  expect(text.length).toBe(expectedLength);
}
async fillSource(source: string): Promise<void> {
  await this.page.locator("input[formcontrolname='source']").fill(source);
}

async clearSource(): Promise<void> {
  await this.page.locator("input[formcontrolname='source']").fill('');
}

async expectSourceErrorVisible(): Promise<void> {
  await expect(
    this.page.getByText(
      /Please add the link of original article\/news\/post\. Link must start with http\(s\):\/\//i
    )
  ).toBeVisible({ timeout: 10000 });
}

async expectSourceErrorNotVisible(): Promise<void> {
  await expect(
    this.page.getByText(
      /Please add the link of original article\/news\/post\. Link must start with http\(s\):\/\//i
    )
  ).toBeHidden();
}

async clickFormCancelButton(): Promise<void> {
  await this.page.locator('.submit-buttons button').filter({
    hasText: /^Cancel$/,
  }).click();
}

async expectCancelModalVisible(): Promise<void> {
  await expect(
    this.page.getByText(
      'All created content will be lost. Do you still want to cancel news creating?'
    )
  ).toBeVisible();
}

async clickYesCancel(): Promise<void> {
  await this.page.getByRole('button', {
    name: 'Yes, cancel',
  }).click();
}

async clickContinueEditing(): Promise<void> {
  await this.page.getByRole('button', {
    name: 'Continue editing',
  }).click();
}

async expectStillOnCreateNewsPage(): Promise<void> {
  await expect(this.page).toHaveURL(/create-news/);
}

async expectRedirectedToNewsPage(): Promise<void> {
  await expect(this.page).toHaveURL(/greenCity\/news$/);
}

async expectTitleValue(expected: string): Promise<void> {
  await expect(
    this.page.locator("textarea[formcontrolname='title']")
  ).toHaveValue(expected);
}

async expectMainTextValue(expected: string): Promise<void> {
  await expect(
    this.page.locator('.ql-editor')
  ).toContainText(expected);
}
async clickPreview(): Promise<void> {
  await this.page
    .getByRole('button', { name: /^(Preview|Переглянути)$/i })
    .click();

  await expect(this.page).toHaveURL(/greenCity\/news\/preview/, {
    timeout: 10000,
  });
}

async expectPreviewTitle(title: string): Promise<void> {
  await expect(
    this.page.locator('.news-title.word-wrap')
  ).toHaveText(title);
}

async expectPreviewContent(content: string): Promise<void> {
  await expect(
    this.page.locator('.news-text-content.word-wrap p')
  ).toContainText(content);
}

async expectPreviewAuthor(author: string): Promise<void> {
  await expect(
    this.page.locator('.news-info-author')
  ).toContainText(author);
}

async expectPreviewDate(): Promise<void> {
  const currentYear = new Date().getFullYear().toString();

  await expect(
    this.page.locator('.news-info-date')
  ).toContainText(currentYear);
}

async expectBackToEditingButton(): Promise<void> {
  await expect(
    this.page.locator('.button-text')
  ).toContainText(/Back to editing/i);
}
async expectEditNewsButtonVisible(): Promise<void> {
  await expect(
    this.page.locator('.edit-news')
  ).toBeVisible();
}

async clickEditNewsButton(): Promise<void> {
  await this.page.locator('.edit-news').click();
}

async clickEditSubmitButton(): Promise<void> {
  await this.page
    .getByRole('button', { name: /^(Edit|Редагувати)$/i })
    .click();
}

async changeTagToEducation(): Promise<void> {
  const educationIsSelected = await this.page
    .locator('app-tags-select a.global-tag-clicked')
    .filter({ hasText: /^(Освіта|Education)/ })
    .isVisible()
    .catch(() => false);

  if (!educationIsSelected) {
    await this.selectTag('Освіта');
  }

  await this.expectTagIsSelected('Освіта');
}

async getNewsCreatedDate(): Promise<string> {
  return (await this.page.locator('.news-info-date').innerText()).trim();
}

async expectNewsTitle(title: string): Promise<void> {
  await expect(
    this.page.locator('.news-title.word-wrap')
  ).toHaveText(title, { timeout: 30000 });
}

async expectNewsContent(content: string): Promise<void> {
  await expect(this.page.locator('.news-text-content')).toContainText(content);
}

async expectNewsTag(tag: string): Promise<void> {
  await expect(this.page.locator('.tags')).toContainText(tag);
}

async expectNewsDate(expectedDate: string): Promise<void> {
  await expect(this.page.locator('.news-info-date')).toHaveText(expectedDate);
}
private getPublishedNewsCardByTitle(title: string) {
  return this.page.getByRole('link').filter({
    hasText: title,
  });
}

async expectPublishedNewsCardContainsTitle(title: string): Promise<void> {
  await expect(
    this.getPublishedNewsCardByTitle(title)
  ).toBeVisible({ timeout: 30000 });
}

async expectPublishedNewsCardContainsTag(title: string, tagName: string): Promise<void> {
  const tagNames: Record<string, string> = {
    Новини: 'News',
    Події: 'Events',
    Освіта: 'Education',
    Ініціативи: 'Initiatives',
    Реклама: 'Ads',
  };

  const englishName = tagNames[tagName] || tagName;

  await expect(
    this.getPublishedNewsCardByTitle(title)
  ).toContainText(new RegExp(`(${tagName}|${englishName})`));
}
async selectTagWithoutExpect(tagName: string): Promise<void> {
  await this.getTagButton(tagName).scrollIntoViewIfNeeded();
  await this.getTagButton(tagName).click();
}
async expectRedirectedToUbsPage(): Promise<void> {
  await expect(this.page).toHaveURL(/#\/ubs/);
}
async closeUnexpectedCancelModalIfVisible(): Promise<void> {
  const yesCancelButton = this.page.getByRole('button', {
    name: /^(Yes, cancel|Так, скасувати)$/i,
  });

  try {
    await yesCancelButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await yesCancelButton.click();

    await yesCancelButton.waitFor({
      state: 'hidden',
      timeout: 10000,
    });
  } catch {
    // Modal did not appear, continue test
  }
}
}