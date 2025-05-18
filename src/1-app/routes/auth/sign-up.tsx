import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@shared/authentication";

export const Route = createFileRoute("/auth/sign-up")({
    component: SignUp,
});

function SignUp() {
    return <SignUpForm />;
}
