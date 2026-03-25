package com.livewell.communication.repository;

import com.livewell.communication.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    @Query("SELECT c FROM ChatMessage c WHERE " +
           "(c.senderId = :userId1 AND c.receiverId = :userId2) OR " +
           "(c.senderId = :userId2 AND c.receiverId = :userId1) " +
           "ORDER BY c.sentAt ASC")
    List<ChatMessage> findConversationBetweenUsers(@Param("userId1") Long userId1, 
                                                     @Param("userId2") Long userId2);
    
    @Query("SELECT DISTINCT CASE " +
           "WHEN c.senderId = :userId THEN c.receiverId " +
           "ELSE c.senderId END " +
           "FROM ChatMessage c " +
           "WHERE c.senderId = :userId OR c.receiverId = :userId")
    List<Long> findAllChatPartners(@Param("userId") Long userId);
    
    @Query("SELECT c FROM ChatMessage c WHERE c.receiverId = :userId AND c.isRead = false " +
           "ORDER BY c.sentAt DESC")
    List<ChatMessage> findUnreadMessages(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM ChatMessage c WHERE c.receiverId = :userId AND c.isRead = false")
    Long countUnreadMessages(@Param("userId") Long userId);
}
