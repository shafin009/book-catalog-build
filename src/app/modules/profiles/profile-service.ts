/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import User from '../user/users-model';

export async function getProfile(userPhoneNumber: string) {
  const user = await User.findOne({ phoneNumber: userPhoneNumber });

  if (!user) {
    throw new Error('User not found');
  }

  const profile = {
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };

  return profile;
}

export async function updateProfile(userPhoneNumber: string, updateData: any) {
  const user = await User.findOneAndUpdate(
    { phoneNumber: userPhoneNumber },
    updateData,
    { new: true }
  );

  return user;
}
