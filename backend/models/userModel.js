const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    image: { 
        type: String, 
        default: "https://media.licdn.com/dms/image/v2/D5603AQHa3WPE5xbSGw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1681410344454?e=1730332800&v=beta&t=gSmhykSc1iSPojlJe9e3lzrIerqK-XkOnav4_Wga2ac" 
    },
    password: { type: String, required: true },
    purchaseBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
