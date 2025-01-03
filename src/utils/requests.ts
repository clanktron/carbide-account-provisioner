import type { Robot, RobotCreate } from "../../env"

export async function GetRobots(): Promise<Robot[]> {
    try {
        const response = await fetch(`/api/v2.0/robots`, {
            method: "GET",
            headers: {'Authorization': 'Basic ' + btoa(username+':'+password)},
            credentials: "omit",
        });
        if (response.ok) {
            const robots: Robot[] = await response.json()
            return robots
        } else {
            throw new Error("invalid response from server");
        }
    } catch (error) {
        throw error;
    }
}

export async function CreateRobot(robot: RobotCreate): Promise<Robot> {
    try {
        const response = await fetch(`/api/v2.0/robots`, {
            method: "POST",
            headers: {'Authorization': 'Basic ' + btoa(username+':'+password)},
            credentials: "omit",
            body: JSON.stringify(robot)
        });
        if (response.ok) {
            const robot: Robot = await response.json()
            return robot
        } else {
            throw new Error("invalid response from server");
        }
    } catch (error) {
        throw error;
    }
}

export async function UpdateRobot(robot: Robot): Promise<Robot> {
    try {
        const response = await fetch(`/api/v2.0/robots`, {
            method: "PUT",
            headers: {'Authorization': 'Basic ' + btoa(username+':'+password)},
            credentials: "omit",
            body: JSON.stringify(robot)
        });
        if (response.ok) {
            const robot: Robot = await response.json()
            return robot
        } else {
            throw new Error("invalid response from server");
        }
    } catch (error) {
        throw error;
    }
}

export async function DeleteRobot(robotID: number): Promise<boolean> {
    try {
        const response = await fetch(`/api/v2.0/robots`, {
            method: "DELETE",
            headers: {'Authorization': 'Basic ' + btoa(username+':'+password)},
            credentials: "omit",
            body: JSON.stringify(robotID)
        });
        if (response.ok) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw error;
    }
}
