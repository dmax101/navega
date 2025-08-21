// Public API Surface of @navega/shared-auth

// Components
export { LoginComponent } from './login.component';

// Services & Interfaces
export {
    AuthService,
    User,
    AuthState,
    LoginCredentials,
    SharedAuthConfig
} from './auth.service';

// Guards
export { AuthGuard } from './auth.guard';

// Modules
export { SharedAuthModule } from './shared-auth.module';
