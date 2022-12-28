import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// type
import type { NextPage } from "next";
// utils
import { useUser, useMutation } from "@libs/client";
// components
import { Layout, EditProfileForm } from "components";

// interfaces
interface ErrorInterface {
    type: "avatar" | "phone" | "username";
    message: string;
}
interface EditProfileForm {
    avatarUrl?: FileList;
    username?: string;
    phone?: string;
}
interface EditProfileReturn {
    status: boolean;
    error?: string;
}

// Page
const EditProfile: NextPage = () => {
    const { push } = useRouter();
    const { user } = useUser();

    // request edited data
    const [edit, { data, loading }] = useMutation<EditProfileReturn>({
        url: "/api/users/me",
        method: "PUT",
    });

    const [errors, setErrors] = useState<ErrorInterface | any>();
    // if authentication error
    useEffect(() => {
        if (data && data.status) {
            push(`/profile/${user?.id}`);
        }
    }, [data, push, user?.id]);

    // already exist phone number
    useEffect(() => {
        if (data && !data.status && data.error) {
            if (data?.status === false && data?.error) {
                setErrors(data.error);
                return;
            }
        }
    }, [data]);

    return (
        <Layout title="프로필 수정" backwardButton>
            <EditProfileForm
                user={user}
                mutatorFn={edit}
                loading={loading}
                errors={errors}
            />
        </Layout>
    );
};

export default EditProfile;
