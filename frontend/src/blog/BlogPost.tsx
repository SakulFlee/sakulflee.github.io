import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdKeyboardReturn, MdVerticalAlignTop } from "react-icons/md";

import BlogPostData from "./data/BlogPostData";
import Footer from "../shared/Footer";

import "./BlogPost.scss";

type BlogProperties = {
    match: {
        params: {
            id?: number;
        };
    };
};

type BlogState = {
    data: BlogPostData;
};

export default class BlogPosts extends React.Component<
    BlogProperties,
    BlogState
    > {
    async componentDidMount(): Promise<void> {
        // Set error message post if no ID is set
        if (this.props.match.params.id == null) {
            this.setState({
                data: BlogPostData.CreateInvalidPost()
            });
        } else {
            let shadowedBlogPostData = await BlogPostData.FetchByID(
                this.props.match.params.id!
            );
            let blogPostData = BlogPostData.FromShadowed(shadowedBlogPostData);
            this.setState({
                data: blogPostData
            });
        }
    }

    makePost(data: BlogPostData): JSX.Element {
        return (
            <div>
                {this.makeButtons()}
                {this.makePostHeader(data)}
                {this.makePostBody(data)}
            </div>
        );
    }

    makePostHeader(data: BlogPostData): JSX.Element {
        return (
            <section className="hero is-medium is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">{data.getCompiledTitle!}</h1>
                        <h2 className="subtitle">{data.getShortDescription}</h2>
                        {this.makeTagList(data)}
                        <div
                            className="is-half has-text-right has-text-white"
                            style={{ paddingRight: "8px" }}
                        >
                            Last updated on {new Date(data.getPublishDate).toUTCString()}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    makePostBody(data: BlogPostData): JSX.Element {
        return (
            <div
                className="content blog-body"
                dangerouslySetInnerHTML={{ __html: data.getCompiledHTML! }}
            />
        );
    }

    makeTagList(data: BlogPostData): JSX.Element {
        const listElements = data.getTags.map((tag, index) => (
            <li key={index} className="tag is-light">
                {tag}
            </li>
        ));
        return (
            <ul className="column is-mobile is-centered tags">{listElements}</ul>
        );
    }

    makeButtons(): JSX.Element {
        return (
            <div>
                <Link to="" className="icon" id="icon-home">
                    <MdHome />
                </Link>
                <div
                    className="icon fake-link"
                    id="icon-return"
                    onClick={_ => window.history.back()}
                >
                    <MdKeyboardReturn />
                </div>
                <div
                    className="icon fake-link"
                    id="icon-top"
                    onClick={_ => window.scrollTo(0, 0)}
                >
                    <MdVerticalAlignTop />
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        if (this.state == null)
            return (
                <progress className="progress is-large is-info" max="100">
                    Loading ...
        </progress>
            );

        return (
            <div>
                {this.state.data.isFinished ? null : (
                    <>
                        <div className="notification is-warning" id="warning">
                            This post is not yet marked as finished. Thus it may be
                            incomplete, wrong or broken.
              <br />
                            Come back some time later!
            </div>
                    </>
                )}
                {this.makePost(this.state.data)}
                <Footer />
            </div>
        );
    }
}
