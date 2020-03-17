import React from 'react';

import BlogHeader from './BlogHeader';
import BlogPosts from './BlogPosts';

import './BlogHome.scss';

type BlogHomeState = {
    search: string;
}

export default class BlogHome extends React.Component<{}, BlogHomeState> {

    update() {
        let search = document.getElementById("blog-search-input") as HTMLInputElement;

        console.log("Text: " + search.value);
        this.setState({
            search: search.value,
        })
    }

    componentDidMount() {
        let search = document.getElementById("blog-search-input")!;
        search.addEventListener('input', this.update.bind(this));
    }

    componentWillUnmount() {
        let search = document.getElementById("blog-search-input")!;
        search.removeEventListener('input', this.update.bind(this));
    }

    render(): JSX.Element {
        return (
            <div id="blog">
                <BlogHeader />
                <BlogPosts search={this.state === null ? "" : this.state.search} />
            </div>
        );
    }
}