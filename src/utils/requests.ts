import type { Robot, RobotCreate } from "../../env"
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

async function apiRequest(url: string, method: string, body?: any): Promise<any> {
    try {
        const authString = getSavedCredentials();
        const headers: Record<string, string> = {
            'Authorization': 'Basic ' + authString,
            'Content-Type': body ? 'application/json' : '',  // Add Content-Type for POST/PUT requests
        };

        const response = await fetch(url, {
            method,
            headers,
            credentials: "omit",
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            handleAuthError();
            throw new Error("Invalid credentials");
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        handleAuthError();
        throw error;
    }
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
    return await apiRequest(`/api/v2.0/robots`, "GET");
}

export async function CreateRobot(robot: RobotCreate): Promise<Robot> {
    return await apiRequest(`/api/v2.0/robots`, "POST", robot);
}

export async function UpdateRobot(robot: Robot): Promise<Robot> {
    return await apiRequest(`/api/v2.0/robots/`+robot.id, "PUT", robot);
}

export async function DeleteRobot(robotID: number): Promise<boolean> {
    return await apiRequest(`/api/v2.0/robots/`+robotID, "DELETE", robotID);
}
