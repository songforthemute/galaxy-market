import { useEffect } from "react";
import { useRouter } from "next/router";
// types
import type { NextPage } from "next";
import type { Post } from "@prisma/client";
// utils
import { useMutation } from "@libs/client";
// components
import { Layout, UploadPostForm } from "components";

interface UploadReturn {
    status: boolean;
    post: Post;
}

// Page
const UploadPosting: NextPage = () => {
    const { push } = useRouter();
    // mutation data
    const [upload, { loading, data }] = useMutation<UploadReturn>({
        url: "/api/posts",
        method: "POST",
    });

    // if success
    useEffect(() => {
        // sending user to 'community/data.post.id' (warp user to correspond posting)
        if (data && data.status) {
            push(`/community/${data.post.id}`);
        }
    }, [data, push]);

    return (
        <Layout
            title="포스트 업로드하기"
            backwardButton
            configTab
            metaContent="Post update page on the Community tab. You can modify or delete the information in a post you post."
        >
            <UploadPostForm mutatorFn={upload} loading={loading} />
        </Layout>
    );
};

export default UploadPosting;
