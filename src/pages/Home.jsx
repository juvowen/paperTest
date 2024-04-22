import { useEffect,useState } from 'react'
import {supabase} from '../config/supabaseClient'

const Home = () =>{
    const [profile,setProfile] = useState(null)
    const [userId,setUserId] = useState(null)
    const [content,setContent] = useState('')
    const [posts,setPosts] = useState([])
    const [pdfFile,setPdfFile] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('other')
    const [storeFile,setStoreFile] = useState('')
    const [commentText,setCommentText] = useState('')
    const [comments,setComments] = useState([])

    const getUserDetails = async() =>{
        try {
            const { data: { user },error } = await supabase.auth.getUser()
            setProfile(user.user_metadata)
            setUserId(user.id)

            if(error){
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signout = async() =>{
        const { error } = await supabase.auth.signOut()

        if(error){
            console.log(error,'cant sign out user')
        }
        
    }

    // const createPost = async() =>{
    //     const {  error } = await supabase
    //     .from('posts')
    //     .insert([{ content: content, author: userId, pdfFile_url:pdfFile },])
    //     .select()
        
    //     if(error){
    //         console.log(error)

    //     }else{
    //         getPost()
    //         setContent('');

    //     }
    // }



    const getPost = async()=>{
        try {
            const { data, error } = await supabase
            .from('posts')
            .select('id,content,pdfFile_url,category,profiles(id,avatar_url,name)')
            if(error){
                console.log(error)
            }else{
                setPosts(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const deletePost = async(postId) =>{
        try {
            const { error } = await supabase
            .from('posts')
            .delete()
            .eq('author',userId)
            .eq('id', String(postId))

            if(error){
                console.log(error)
            }
        
        } catch (error) {
            console.log(error)
        }
    }

    // const createFile = async() =>{
    //     try {
    //         const { data, error } = await supabase
    //           .storage
    //           .from('files')
    //           .upload('public/avatar1.png', avatarFile, {
    //             cacheControl: '3600',
    //             upsert: false
    //           })
    //     } catch (error) {
            
    //     }
    // }


    const handleFileChange = async (event) => {
        // const file = event.target.files[0];
        //posts/research/Astoria_Studios_Rentals.pdf
        setStoreFile(event.target.files[0])
        setPdfFile(`https://tnakuqxgfetrnpjvkwnx.supabase.co/storage/v1/object/public/files/posts/${selectedCategory}/${storeFile.name}`)
        // if (file) {
        //      await uploadFile(file);
        // }
    };

    // const uploadFile = async (file) => {
    //             const { data, error } = await supabase.storage.from('files').upload(`posts/${selectedCategory}/${file.name}`, file);
    //             if (error) {
    //                 console.log('Error uploading file:', error.message);
    //             } else {
    //                 console.log('File uploaded successfully:', data);
    //             // Here you can save the file URL or metadata to your database if needed
    //         }
    // }

const createPos = async () => {
    try {
        const { error:fileError} = await supabase.storage
            .from('files')
            .upload(`posts/${selectedCategory}/${storeFile.name}`, storeFile);

        if (fileError) {
            console.log('Error uploading file:', fileError.message);
        }

        const { error } = await supabase
            .from('posts')
            .insert([{ content: content, author: userId, pdfFile_url: pdfFile, category:selectedCategory}]);

        if (error) {
            console.log(error);
        } else {
            console.log('Post created successfully');
            getPost();
            setContent('');
            //setNewCat(selectedCategory)

            //setStoreFile('');
            //setPdfFile('')
        }
    } catch (error) {
        console.log(error);
    }
};

    

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    const createComment = async(postId)=>{
        try {
            const { error } = await supabase
            .from('comments')
            .insert([{ post_id: postId, user_id: userId, commentText:commentText}]);

            if(error){
                console.log(error)
            }else{
                getComment()
                setCommentText('')
            }
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
        
    }


    const getComment = async()=>{
        try {
            const { data, error } = await supabase
            .from('comments')
            .select('id,post_id,user_id,commentText,profiles(id,avatar_url,name)')
            if(error){
                console.log(error)
            }else{
                setComments(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        getUserDetails()
        getPost()
        getComment()

    },[])





    

    return(
       <div>
        <h1>Home Screen</h1>
        <button onClick={signout}>signOut</button>

        <div style={cardStyle}>
            <div>
                <h3>{profile?.name}</h3>
            </div>

            <input
                type="text"
                placeholder="Enter something..."
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                style={inputStyle}
            />

            <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="article">Article</option>
                    <option value="research">Research</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* <div>
                <h3>{profile?.name}</h3>
            </div> */}

            <input
                type="file"
                style={inputStyle}
                onChange={handleFileChange}
            />

            <button onClick={()=>{createPos();}}style={buttonStyle}>
                Click me file
            </button>
            
            {/* 
            <button onClick={createPost} style={buttonStyle}>
                Click me post
            </button> */}

        </div>

        {/* <div style={cardStyle}>
            <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="article">Article</option>
                    <option value="research">Research</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <h3>{profile?.name}</h3>
            </div>

            <input
                type="file"
                style={inputStyle}
                onChange={handleFileChange}
            />
            <button onClick={uploadFile} style={buttonStyle}>
                Click me
            </button>

        </div> */}

        <div>
            {posts.map((post)=>(
                <div  key={post.id} style={cardStyle}>
                    <h1>{post.content}</h1>
                    <h2>{post.profiles.id}</h2>
                    <h3>{post.id}</h3>
                    {post.pdfFile_url &&(
                        <h3>{post.category}</h3>
                    )}
                    <embed src={post.pdfFile_url} type="application/pdf" width="100%" height="100%" />
                    <div style={{ marginBottom: '10px' }}>
                    <input 
                        onChange={(e) => setCommentText(e.target.value)}
                        style={{...inputStyle,marginBottom:'0'}}
                        placeholder='leave a comment'
                        value={commentText[post.id]}
                    />
                    <button onClick={()=>createComment(post.id)}>send</button>
                        </div>
                    {comments.filter(comment=>comment.post_id === post.id).map((comment,index)=>(
                        <div style={commentStyle} key={index}>
                            {comment.commentText && comment.post_id &&(
                                <h3>{comment.commentText}</h3>
                            )}
                        </div>
                    ))}

                    <div>
                    {post.profiles.id === userId && (
                        <button onClick={()=>deletePost(post.profiles.id)}>delete</button>
                    )}
                    </div>
                </div>
            ))}
            
        </div>

       </div>
    );
}



const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px',
    maxWidth: '300px',
};

const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
};
const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
};
const commentStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
};

export default Home


