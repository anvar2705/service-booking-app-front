import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Calendar,
});

function Calendar() {
    return (
        <div className="p-2">
            <h3>CALENDAR</h3>
        </div>
    );
}
