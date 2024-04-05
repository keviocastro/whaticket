import openSocket from "socket.io-client";
import { getBackendUrl } from "../config";

function connectToSocket() {
    console.log('REACT_APP_BACKEND_URL',getBackendUrl())
    return openSocket(getBackendUrl());
}

export default connectToSocket;