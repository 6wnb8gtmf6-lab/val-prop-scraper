"use client"

import { signIn } from "next-auth/webauthn"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function PasskeySection() {
    const { data: session } = useSession()
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleRegisterPasskey = async () => {
        setStatus("loading")
        setErrorMessage("")
        try {
            await signIn("webauthn", { action: "register", redirect: false })
            setStatus("success")
        } catch (error) {
            console.error("Failed to register passkey", error)
            setStatus("error")
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occurred")
            }
        }
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Security</h3>
                <div className="mt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-medium text-gray-900">Passkeys</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Securely sign in without a password using your fingerprint, face, or device screen lock.
                            </p>
                        </div>
                        <button
                            onClick={handleRegisterPasskey}
                            disabled={status === "loading"}
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {status === "loading" ? "Registering..." : "Add Passkey"}
                        </button>
                    </div>

                    {status === "success" && (
                        <div className="mt-4 rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Passkey registered successfully! You can now use it to sign in.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mt-4 rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">
                                        Failed to register passkey. {errorMessage && <span className="block mt-1 font-mono text-xs">{errorMessage}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
