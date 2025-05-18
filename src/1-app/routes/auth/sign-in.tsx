import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@shared/authentication";

export const Route = createFileRoute("/auth/sign-in")({
    component: SignIn,
});

function SignIn() {
    return <SignInForm />;
}
