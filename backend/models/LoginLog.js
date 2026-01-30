const loginLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: String
});

const LoginLog = mongoose.model('LoginLog', loginLogSchema);