// Public API Surface of @navega/shared-auth

// Components
export { LoginComponent } from './components/login.component';

// Services & Interfaces
export {
    AuthService
} from './services/auth.service';

// Interfaces (separar tipos caso mova para interfaces/)
export type { User, AuthState, LoginCredentials, SharedAuthConfig } from './services/auth.service';

// Guards
export { AuthGuard } from './guards/auth.guard';

// Modules
export { SharedAuthModule } from './shared-auth.module';
