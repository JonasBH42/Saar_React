--
-- PostgreSQL database dump
--

-- Dumped from database version 11.17
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--     
-- Name: addresses; Type: TABLE; Schema: refactor; 
--

CREATE TABLE refactor.addresses (
    objectid double precision,
    uniq_id double precision,
    setl_code double precision,
    setl_name character varying(255),
    street_term character varying(255),
    street_name character varying(255),
    street_fullname character varying(255),
    street_code double precision,
    house_num double precision,
    entry_letr character varying(255),
    bldg_id double precision,
    year character varying(255),
    x double precision,
    y double precision
);


--
-- PostgreSQL database dump complete
--

