"use client";

import React from "react";
import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const pattern = new RegExp(searchText, "i");
  const filteredPosts = posts.filter(
    (post) =>
      pattern.test(post.creator.username) ||
      pattern.test(post.prompt) ||
      pattern.test(post.tag)
  );

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={(e) => {
          setSearchText(e);
        }}
      />
    </section>
  );
};

export default Feed;
