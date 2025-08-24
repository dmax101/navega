import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { LoginComponent } from '@navega/shared-auth/components/login.component';
import { AuthService } from '@navega/shared-auth/services/auth.service';
import { AuthGuard } from '@navega/shared-auth/guards/auth.guard';

export interface SharedAuthConfig {
    tokenKey?: string;
    userKey?: string;
    loginRoute?: string;
    dashboardRoute?: string;
}

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, UiModule],
    exports: [LoginComponent]
})
export class SharedAuthModule {

    static forRoot(config?: SharedAuthConfig): ModuleWithProviders<SharedAuthModule> {
        return {
            ngModule: SharedAuthModule,
            providers: [
                AuthService,
                AuthGuard,
                { provide: 'AUTH_CONFIG', useValue: config || {} }
            ]
        };
    }

    static forFeature(): ModuleWithProviders<SharedAuthModule> {
        return {
            ngModule: SharedAuthModule,
            providers: []
        };
    }
}
