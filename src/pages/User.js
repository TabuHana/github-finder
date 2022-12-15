import { FaCodepen, FaStore, FaUserFriends, FaUsers, FaTwitter } from 'react-icons/fa';
import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from '../components/layouts/Spinner';
import GithubContext from "../context/github/GithubContext";
import RepoList from '../components/repos/RepoList';
import { getUserAndRepos } from '../context/github/GithubActions';

const User = () => {
  const { user, loading, repos, dispatch } = useContext(GithubContext);

  const params = useParams();

  //There is a bug, users not updated. Always loading

  useEffect(() => {
    dispatch({ type: 'SET_lOADING' });
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login);
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData });

    };

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog;

  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost text-neutral-content'>
            Back To Search
          </Link>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={ avatar_url } alt='' />
              </figure>
              <div className='card-body justify-end'>
                <h2 className='card-title mb-0 text-neutral-content'>{ name }</h2>
                <p className='flex-grow-0 text-white'>{ login }</p>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-6'>
              <h1 className='text-3xl card-title text-info'>
                { name }
                <div className='ml-2 mr-1 badge badge-success'>{ type }</div>
                { hireable && (
                  <div className='mx-1 badge badge-info'>Hireable</div>
                ) }
                { twitter_username && (
                  <div className="text-blue-400 text-3xl">
                    <a
                      href={ `https://twitter.com/${ twitter_username }` }
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaTwitter />
                    </a>
                  </div>
                ) }
              </h1>
              <p className='text-neutral-content'>{ bio }</p>
              <div className='mt-4 card-actions'>
                <a
                  href={ html_url }
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-outline text-neutral-content'
                >
                  Visit Github Profile
                </a>
              </div>
            </div>

            <div className='w-full rounded-lg shadow-md bg-base-100 stats text-neutral-content'>
              { location && (
                <div className='stat'>
                  <div className='stat-title text-md'>Location</div>
                  <div className='text-lg stat-value'>{ location }</div>
                </div>
              ) }
              { blog && (
                <div className='stat'>
                  <div className='stat-title text-md'>Website</div>
                  <div className='text-lg stat-value'>
                    <a href={ websiteUrl } target='_blank' rel='noreferrer'>
                      { blog }
                    </a>
                  </div>
                </div>
              ) }

            </div>
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats text-neutral-content'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='stat'>
              <div className='stat-figure text-info'>
                <FaUsers className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Followers</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                { followers }
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-info'>
                <FaUserFriends className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Following</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                { following }
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-info'>
                <FaCodepen className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Repos</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                { public_repos }
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-info'>
                <FaStore className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Gists</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                { public_gists }
              </div>
            </div>
          </div>
        </div>

        <RepoList repos={ repos } />
      </div>
    </>
  );
};
export default User;