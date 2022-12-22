import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// type
import type { NextPage } from "next";
// custom hooks
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
// components
import Layout from "@components/layout";
import { EditProfileForm } from "@components/Templetes";

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
        if (data?.status === false && data?.error) {
            setErrors(data.error);
            return;
        }

        if (data && data.status) {
            push(`/profile/${user?.id}`);
        }
    }, [data]);

    // already exist phone number
    useEffect(() => {
        if (data && !data.status && data.error) {
            // setErrors({ message: data.error });
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
