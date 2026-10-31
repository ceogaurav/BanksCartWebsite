import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Calendar, Clock, ExternalLink, Award, FileCheck } from 'lucide-react';
import { AUTHORS_DATA, DEFAULT_AUTHOR, DEFAULT_REVIEWER, AuthorProfile } from '../../data/authorsData';

interface AuthorBylineProps {
  authorSlug?: string;
  reviewerSlug?: string;
  publishedDate?: string;
  updatedDate?: string;
  readTime?: string;
  showBioCard?: boolean;
}

export const AuthorByline: React.FC<AuthorBylineProps> = ({
  authorSlug = 'raghav-singhal',
  reviewerSlug = 'amit-khurana',
  publishedDate = 'October 15, 2026',
  updatedDate = 'October 30, 2026',
  readTime = '8 min read',
  showBioCard = true
}) => {
  const author: AuthorProfile = AUTHORS_DATA[authorSlug] || DEFAULT_AUTHOR;
  const reviewer: AuthorProfile = AUTHORS_DATA[reviewerSlug] || DEFAULT_REVIEWER;

  return (
    <div className="w-full my-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 font-sans text-slate-800">
      {/* Top Bar: Author & Reviewer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
        {/* Author Byline */}
        <div className="flex items-start space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border border-white" title="Verified Financial Expert">
              <CheckCircle2 className="w-3 h-3" />
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Written by
            </span>
            <Link
              to={`/author/${author.slug}`}
              className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
            >
              <span>{author.name}</span>
              <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <p className="text-xs text-slate-600 font-medium">
              {author.credentials}
            </p>
          </div>
        </div>

        {/* Fact-Checker & Reviewer Sign-Off */}
        <div className="flex items-start space-x-3 md:border-l md:border-slate-200 md:pl-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow">
              {reviewer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border border-white" title="Verified Banking Reviewer">
              <ShieldCheck className="w-3 h-3" />
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block inline-flex items-center gap-1">
              <FileCheck className="w-3 h-3 text-emerald-600" />
              Fact-Checked & Reviewed by
            </span>
            <Link
              to={`/author/${reviewer.slug}`}
              className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
            >
              <span>{reviewer.name}</span>
              <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <p className="text-xs text-slate-600 font-medium">
              {reviewer.credentials}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Bar: Timestamps & Editorial Verification Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Published: <strong>{publishedDate}</strong></span>
          </span>
          <span className="inline-flex items-center gap-1 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Last Updated & Fact-Checked: <strong className="text-emerald-800">{updatedDate}</strong></span>
          </span>
          <span className="text-slate-400 hidden sm:inline">&bull;</span>
          <span>{readTime}</span>
        </div>

        <Link
          to="/editorial-policy"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors text-xs border border-blue-200"
          title="Learn about BanksCart's editorial integrity and rate verification standards"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Editorial Integrity Policy</span>
        </Link>
      </div>

      {/* Optional Author Mini Bio Card */}
      {showBioCard && (
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="leading-relaxed">
            <strong className="text-slate-800">{author.name}</strong> has {author.experienceYears}+ years experience in Indian retail debt markets. All rate calculations are verified against official bank interest schedules.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-700 hover:underline font-semibold"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">|</span>
            <Link
              to={`/author/${author.slug}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              View Full Bio & Certifications &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorByline;
