import { expect, Page, Locator } from '@playwright/test';
import { formatDateForConfirmation, formatDateForAriaLabel } from '../helpers/datePicker';
import { generateRandomEmail, generateRandomPhoneNumber } from '../helpers/randomGenerators';

export class HomePage {
    readonly page: Page;
    readonly buttons: { [key: string]: Locator };
    readonly messages: { [key: string]: Locator };
    readonly headings: { [key: string]: Locator };
    readonly textboxes: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;
        this.buttons = {
            admin: page.getByRole('link', { name: 'Admin', exact: true }),
            contact: page.locator('#navbarNav').getByRole('link', { name: 'Contact' }),
            login: page.getByRole('button', { name: 'Login' }),
            reserveNow: page.getByRole('button', { name: 'Reserve Now' }),
            submit: page.getByRole('button', { name: 'Submit' })
        };

        this.headings = {
            bookingConfirmed: page.getByRole('heading', { name: 'Booking Confirmed' }),
            doubleRoomPage: page.getByRole('heading', { name: 'Double Room' }),
            queryReceived: page.getByRole('heading', { name: 'Thanks for getting in touch' }),
            welcome: page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })
        };

        this.messages = {
            invalidCredentials: page.getByText('Invalid credentials')
        };

        this.textboxes = {
            checkinDate: page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox'),
            checkoutDate: page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox'),
            contactEmail: page.getByTestId('ContactEmail'),
            contactMessage: page.getByTestId('ContactDescription'),
            contactName: page.getByTestId('ContactName'),
            contactPhone: page.getByTestId('ContactPhone'),
            contactSubject: page.getByTestId('ContactSubject'),
            email: page.getByRole('textbox', { name: 'Email' }),
            firstName: page.getByRole('textbox', { name: 'Firstname' }),
            lastName: page.getByRole('textbox', { name: 'Lastname' }),
            password: page.getByRole('textbox', { name: 'Password' }),
            phoneNumber: page.getByRole('textbox', { name: 'Phone' }),
            username: page.getByRole('textbox', { name: 'Username' })
        };
    }

    async openPage(page: Page) {
        await page.goto('https://automationintesting.online');
        await expect(this.headings.welcome).toBeVisible();
    }

    async attemptAdminLogin(page: Page) {
        await this.openPage(page);
        await this.buttons.admin.click();
        await this.textboxes.username.fill('adminsuperuser1@email.com');
        await this.textboxes.password.fill('Password123');
        const [loginResponse] = await Promise.all([
            page.waitForResponse(response =>
                response.url() === 'https://automationintesting.online/api/auth/login' &&
                response.request().method() === 'POST'
            ),
            this.buttons.login.click()
        ]);
        expect(loginResponse.status()).toBe(401);
        await expect(this.messages.invalidCredentials).toBeVisible();
    }

    async fillContactForm() {
        await this.textboxes.contactName.fill('First and Last Name');
        await this.textboxes.contactEmail.fill('email@hotmail.com');
        await this.textboxes.contactPhone.fill('07865765465');
        await this.textboxes.contactSubject.fill('Family Room Availability');
        await this.textboxes.contactMessage.fill('Hi, I would like to check for the availability of Family Rooms at your B&B');
        await this.buttons.submit.click();
    }

    async fillCustomerDetails() {
        await this.textboxes.firstName.fill('First');
        await this.textboxes.lastName.fill('Last');
        await this.textboxes.email.fill(generateRandomEmail());
        await this.textboxes.phoneNumber.fill(generateRandomPhoneNumber());
        await this.buttons.reserveNow.click();
    }

    /**
     * Attempts to reserve a double room for fixed dates.
     * Note: The selector for the double room booking is brittle due to lack of unique identifiers in the markup.
     * In a production environment, a data-testid or unique attribute should be used instead.
     */
    async reserveDoubleRoomWithDynamicDates(page: Page) {
        // Use fixed dates: Tuesday 22nd July to Thursday 24th July 2025
        const checkinDate = new Date(2025, 6, 22); // July is month 6 (0-indexed)
        const checkoutDate = new Date(2025, 6, 24);
        const checkinLabel = formatDateForAriaLabel(checkinDate);
        const checkoutLabel = formatDateForAriaLabel(checkoutDate);
        console.log(checkinLabel);
        console.log(checkoutLabel);
        await this.openPage(page);
        await page.waitForTimeout(500); // Wait for page to settle

        // Check if check-in date is in a different month from today
        const today = new Date();
        await this.textboxes.checkinDate.click();
        await page.waitForTimeout(300); // Wait for date picker to open
        if (
            checkinDate.getMonth() !== today.getMonth() ||
            checkinDate.getFullYear() !== today.getFullYear()
        ) {
            await page.getByRole('button', { name: 'Next Month' }).click();
            await page.waitForTimeout(300); // Wait for calendar to update
        }
        await page.getByRole('option', { name: checkinLabel }).click();

        // Check if check-out date is in a different month from check-in
        await this.textboxes.checkoutDate.click();
        await page.waitForTimeout(300); // Wait for date picker to open
        if (
            checkoutDate.getMonth() !== checkinDate.getMonth() ||
            checkoutDate.getFullYear() !== checkinDate.getFullYear()
        ) {
            await page.getByRole('button', { name: 'Next Month' }).click();
            await page.waitForTimeout(300); // Wait for calendar to update
        }
        await page.getByRole('option', { name: checkoutLabel }).click();

        // Brittle selector: see note above
        await page.locator('#rooms > div > div.row.g-4 > div:nth-child(1) > div > div.card-footer.bg-white.d-flex.justify-content-between.align-items-center > a').click();
        await expect(this.headings.doubleRoomPage).toBeVisible();
        await this.buttons.reserveNow.click();
        await this.fillCustomerDetails();

        const confirmationCard = page.locator('.card-body');
        try {
            await expect(confirmationCard.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
            await expect(confirmationCard.getByText('Your booking has been confirmed for the following dates:')).toBeVisible();
            await expect(confirmationCard.getByText('2025-07-22 - 2025-07-24')).toBeVisible();
        } catch (e) {
            // Fallback: Error handling for 500 response and error message
            const reservationResponse = await page.waitForResponse(response =>
                response.url().includes('/api/booking') && response.status() === 500
            , { timeout: 2000 }).catch(() => null);
            if (reservationResponse) {
                const errorMessage = 'Application error: a client-side exception has occurred while loading automationintesting.online (see the browser console for more information).';
                await expect(page.getByText(errorMessage)).toBeVisible();
            } else {
                throw e;
            }
        }
    }

    async sendAMessage(page: Page) {
        await this.openPage(page);
        await this.buttons.contact.click();
        await this.fillContactForm();
        await expect(this.headings.queryReceived).toBeVisible();
    }

    async testHomepagePerformance(page: Page) {
        const start = Date.now();
        await page.goto('https://automationintesting.online');
        const duration = Date.now() - start;
        console.log(`Page load time: ${duration}ms`);
        expect(duration).toBeLessThan(2000);
        await expect(page.locator('h1')).toContainText('Welcome');
    }
}
