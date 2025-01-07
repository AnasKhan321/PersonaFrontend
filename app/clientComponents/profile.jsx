import { Twitter, MessageCircle, Repeat2, Heart, Share } from 'lucide-react';


export default function Profile(profile){
    console.log(profile)

    const {image  , name , username , description} = profile.profile; 
    return(
        <div className="bg-white rounded-xl shadow-sm overflow-hidden my-3 ">
            <div className="p-4">
            <div className="flex items-start gap-4">
                <img
                src={image}
                alt={name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
                    <Twitter className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-500">@{username}</p>
                <p className="text-sm text-gray-700 mt-2">{description}</p>
                </div>
            </div>
            </div>
        </div> 
    )
}