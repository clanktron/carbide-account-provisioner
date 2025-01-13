import type { Errors, Robot, RobotCreate } from "../../env"
import router from "@/router";

export function getSavedCredentials(): string {
    const authString = sessionStorage.getItem('authString')
    if (authString == null) {
        throw new Error("missing basic auth credentials");
    }
    return authString
}

function handleAuthError() {
    sessionStorage.removeItem('authString');
    router.push('/');
}

export async function TestCredentials(username: string, password: string): Promise<boolean> {
    try {
        const authString = btoa(username+':'+password)
        const response = await fetch(`/api/v2.0/robots`, {
            method: "GET",
            headers: {'Authorization': 'Basic ' + authString},
            credentials: "omit",
        });
        if (response.ok) {
            sessionStorage.setItem('authString', authString)
            return true
        } else {
            throw new Error("invalid response from server");
        }
    } catch (error) {
        throw error;
    }
}

export async function GetRobots(): Promise<Robot[]> {
    const url = `/api/v2.0/robots`
    const method = 'GET'
    try {
        const authString = getSavedCredentials();
        const headers: Record<string, string> = {
            'Authorization': 'Basic ' + authString,
        };
        const response = await fetch(url, {
            method,
            headers,
            credentials: "omit",
        });
        if (response.ok) {
            return await response.json() as Robot[];
        } else if (response.status === 401) {
            handleAuthError();
            throw new Error("Invalid credentials");
        } else if (response.status === 400) {
            const errors: Errors  = await response.json()
            const errorMessage = errors.errors?.[0]?.message || "Bad Request"
            throw new Error(errorMessage);
        } else {
            throw new Error("An error occurred while processing your request. Please try again later.");
        }
    } catch (error) {
        throw error;
    }
}

export async function CreateRobot(robot: RobotCreate): Promise<Robot> {
    const url = `/api/v2.0/robots`
    const method = 'POST'
    try {
        const authString = getSavedCredentials();
        const headers: Record<string, string> = {
            'Authorization': 'Basic ' + authString,
            'Content-Type': 'application/json'
        };

        const response = await fetch(url, {
            method,
            headers,
            credentials: "omit",
            body: JSON.stringify(robot)
        });
        if (response.ok) {
            return await response.json() as Robot;
        } else if (response.status === 401) {
            handleAuthError();
            throw new Error("Invalid credentials");
        } else if (response.status === 400) {
            const errors: Errors  = await response.json()
            const errorMessage = errors.errors?.[0]?.message || "Bad Request"
            throw new Error(errorMessage);
        } else {
            throw new Error("An error occurred while processing your request. Please try again later.");
        }
    } catch (error) {
        throw error;
    }
}

export async function UpdateRobot(robot: Robot): Promise<boolean> {
    const url = `/api/v2.0/robots/`+robot.id
    const method = 'PUT'
    try {
        const authString = getSavedCredentials();
        const headers: Record<string, string> = {
            'Authorization': 'Basic ' + authString,
            'Content-Type': 'application/json'
        };

        const response = await fetch(url, {
            method,
            headers,
            credentials: "omit",
            body: JSON.stringify(robot)
        });
        if (response.ok) {
            return true
        } else if (response.status === 401) {
            handleAuthError();
            throw new Error("Invalid credentials");
        } else if (response.status === 400) {
            const errors: Errors  = await response.json()
            const errorMessage = errors.errors?.[0]?.message || "Bad Request"
            throw new Error(errorMessage);
        } else {
            throw new Error("An error occurred while processing your request. Please try again later.");
        }
    } catch (error) {
        throw error;
    }
}

export async function DeleteRobot(robotID: number): Promise<boolean> {
    const url = `/api/v2.0/robots/`+robotID
    const method = 'DELETE'
    try {
        const authString = getSavedCredentials();
        const headers: Record<string, string> = {
            'Authorization': 'Basic ' + authString,
        };
        const response = await fetch(url, {
            method,
            headers,
            credentials: "omit",
        });
        if (response.ok) {
            return true
        } else if (response.status === 401) {
            handleAuthError();
            throw new Error("Invalid credentials");
        } else if (response.status === 400) {
            const errors: Errors  = await response.json()
            const errorMessage = errors.errors?.[0]?.message || "Bad Request"
            throw new Error(errorMessage);
        } else {
            throw new Error("An error occurred while processing your request. Please try again later.");
        }
    } catch (error) {
        throw error;
    }
}
